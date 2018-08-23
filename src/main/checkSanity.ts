import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { isInstalled } from './Util';
import { IAppConfigData } from "../shared/config/IAppConfigData";

const stat = util.promisify(fs.stat);

/**
 * Get an (incomplete) array of important file paths that should be in the
 * Flashpoint installation. The paths either absolute or relative to the
 * current working directory.
 *
 * @param flashpointPath The path in which Flashpoint is installed. This should
 *   be grabbed from config.flashpointPath.
 */
function getImportantFiles(flashpointPath: string) {
  return [
    path.join(flashpointPath, './Arcade/Data/Platforms/Flash.xml'),
    path.join(flashpointPath, './Arcade/Games/Flash/router.php'),
  ]
}

/**
 * Check if _all_ the files given exist.
 *
 * @param files A list of paths that should exist
 * @returns true if all of the files exist, false if any of the files are
 *   missing.
 */
async function doFilesExistCheck(files: string[]): Promise<boolean> {
  const statPromiseArray = files.map(file => stat(file));

  try {
    await Promise.all(statPromiseArray);
  } catch (e) {
    return false;
  }

  return true;
}


/**
 * Check if php is installed on the current system. This is always true on
 * Windows since php is bundled with Flashpoint.
 */
async function isPhpInstalledCheck() {
  if (process.platform === 'win32') {
    // Flashpoint bundles php on windows.
    return true;
  }

  return await isInstalled('php');
}

/**
 * Make an array of failed checks for sanityCheck to return.
 *
 * @param isFlashpointValid Is the flashpoint installation valid?
 * @param isPhpInstalled Is php installed on this system (always true on
 *   Windows)
 */
function makeFailedChecksArray(isFlashpointValid: boolean, isPhpInstalled: boolean) {
  let failedChecks: FailedCheck[] = [];
  if (!isFlashpointValid) failedChecks.push(FailedCheck.InvalidFlashpointInstall);
  if (!isPhpInstalled) failedChecks.push(FailedCheck.PhpMissing);

  return failedChecks;
}

/**
 * The different errors that checkSanity can return
 */
export enum FailedCheck {
  /**
   * Signifies that either the flashpoint path points to something that isn't
   * flashpoint, or the flashpoint installation is incomplete/corrupted.
   */
  InvalidFlashpointInstall,

  /**
   * Signifies that php isn't installed. This error can only ever appear on
   * linux since php is bundled with Flashpoint on Windows.
   *
   * The user should be asked to install the `php` package.
   */
  PhpMissing,
}

/**
 * Check if LunchBox is ready to launch or not. The setup wizard will be
 * launched if some of the tests fail (TODO).
 *
 * @param config The application config
 * @returns An array containing the failing tests, an empty array means that
 *   all tests passed.
 */
export default async function checkSanity(config: IAppConfigData) {
  const importantFiles = getImportantFiles(config.flashpointPath);

  const promiseArray = [
    doFilesExistCheck(importantFiles),
    isPhpInstalledCheck(),
  ];

  const [doFilesExist, isPhpInstalled] = await Promise.all(promiseArray);

  return makeFailedChecksArray(doFilesExist, isPhpInstalled);
}
