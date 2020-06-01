import { copyFolder } from '@back/importGame';
import { OpenDialogFunc } from '@back/types';
import { pathExists } from '@back/util/misc';
import { get7zExec } from '@back/util/SevenZip';
import { ContentServer } from '@database/entity/ContentServer';
import { IAppConfigData } from '@shared/config/interfaces';
import * as fs from 'fs-extra';
import { extractFull } from 'node-7z';
import * as path from 'path';
import { getManager } from 'typeorm';

export type InstallGameOpts = {
  config: IAppConfigData;
  gameId: string;
  isDev: boolean;
  exePath: string;
  openDialog: OpenDialogFunc;
}

export namespace DownloadManager {
  export async function getContentServers(): Promise<ContentServer[]> {
    const contentServerRepository = getManager().getRepository(ContentServer);
    return contentServerRepository.find();
  }

  export async function getOrCreateContentServer(host: string): Promise<ContentServer | undefined> {
    const contentServerRepository = getManager().getRepository(ContentServer);
    const existingServer = await contentServerRepository.findOne({ where: { host: host }});
    if (!existingServer) {
      const newServer = contentServerRepository.create();
      newServer.host = host;
      newServer.gameCount = 0;
      return await contentServerRepository.save(newServer);
    }
    return existingServer;
  }

  export async function saveContentServer(contentServer: ContentServer): Promise<ContentServer | undefined> {
    const contentServerRepository = getManager().getRepository(ContentServer);
    return await contentServerRepository.save(contentServer);
  }

  export function downloadGame(gameId: string) {
    // TODO
  }

  export async function installGame(opts: InstallGameOpts) {
    const { config, gameId, isDev, exePath, openDialog } = opts;
    const gameArchive = path.join(config.flashpointPath, config.gameArchiveFolderPath, gameId + '.7z');
    const tempFolder = path.join(config.flashpointPath, config.gameArchiveFolderPath, gameId!);
    const gameFolder = path.join(config.flashpointPath, 'Server', 'htdocs');
    if (!(await pathExists(tempFolder))) {
      await fs.promises.mkdir(tempFolder);
    }
    if (!(await pathExists(gameFolder))) {
      await fs.promises.mkdir(gameFolder);
    }

    return new Promise<void>((resolve, reject) => {
      // Extract the game archive
      const extractStream = extractFull(gameArchive, tempFolder, {
        $bin: get7zExec(isDev, exePath)
      });

      extractStream.on('error', (err) => {
        // TODO Warn user
        reject('Error extracting files.\n' + err.stack);
      });
      extractStream.on('end', () => {
        copyFolder(path.join(tempFolder, 'content'), gameFolder, true, openDialog, undefined,true)
        .catch(() => reject('Error moving files.'))
        .then(() => resolve())
        .finally(() => {
          // Cleanup
          fs.remove(tempFolder, (err) => {
            if (err) {
              console.error(`Error deleting temp dir ${tempFolder}`);
            }
          });
        });
      });
    });
  }

  export function uninstallGame(gameId: string) {
    // TODO
  }

  export function deleteGame(gameId: string) {
    // TODO
  }
}