import { AdditionalApp } from '../../database/entity/AdditionalApp';
import { Game } from '../../database/entity/Game';
import { InstallState } from '@database/entity/types';

export namespace ModelUtils {
  export function createGame(): Game {
    return {
      id: '',
      title: '',
      alternateTitles: '',
      series: '',
      developer: '',
      publisher: '',
      platform: '',
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      broken: false,
      extreme: false,
      playMode: '',
      status: '',
      notes: '',
      tags: [],
      source: '',
      applicationPath: '',
      launchCommand: '',
      releaseDate: '',
      version: '',
      originalDescription: '',
      language: '',
      library: '',
      orderTitle: '',
      addApps: [],
      content: [],
      installState: InstallState.LEGACY,
      placeholder: false
    };
  }

  export function createAddApp(game: Game): AdditionalApp {
    return {
      id: '',
      parentGame: game,
      applicationPath: '',
      autoRunBefore: false,
      launchCommand: '',
      name: '',
      waitForExit: false,
    };
  }
}