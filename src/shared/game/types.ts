import { LangContainer } from '@shared/lang';
import { InstallState } from '@database/entity/types';

export function getInstallStateKey(installState: InstallState, contentAvailable: boolean) {
  switch (installState) {
    case InstallState.LEGACY:
    case InstallState.PLAYABLE:
      return 'playable';
    case InstallState.DOWNLOADED:
      return 'installable';
    case InstallState.NOINSTALLER:
      return contentAvailable ? 'downloadable' : 'unavailable';
  }
}

export function getInstallStateString(strings: LangContainer, installState: InstallState, contentAvailable: boolean) {
  console.log(installState);
  switch (installState) {
    case InstallState.LEGACY:
    case InstallState.PLAYABLE:
      return strings.browse.playable;
    case InstallState.DOWNLOADED:
      return strings.browse.installable;
    case InstallState.NOINSTALLER:
      return contentAvailable ? strings.browse.downloadable : strings.browse.unavailable;
  }
}