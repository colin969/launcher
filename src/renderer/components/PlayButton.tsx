import { getInstallStateString, getInstallStateKey } from '@shared/game/types';
import { Omit } from '@shared/interfaces';
import * as React from 'react';
import { LangContext } from '@renderer/util/lang';
import { LangContainer } from '@shared/lang';
import { OpenIcon } from './OpenIcon';
import { InstallState } from '@database/entity/types';
import { Game } from '@database/entity/Game';

/** Props for an input element. */
type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type PlayButtonProps = Omit<InputProps, 'type'> & {
  installState: InstallState;
  game: Game;
  onPlayClick: () => void;
  onUninstallClick: () => void;
  onDeleteInstallerClick: () => void;
  onMakeCurationClick: () => void;
};

/** A normal button, but with the "simple-button" css class added. */
/** Will be edited later down the line! */
export function PlayButton(props: PlayButtonProps) {
  const { installState, game, onPlayClick, onUninstallClick, onDeleteInstallerClick, onMakeCurationClick, ...rest } = props;
  const contentAvailable = game.content.length > 0;
  const strings = React.useContext(LangContext);
  let key = getInstallStateKey(installState, contentAvailable);
  let text = getInstallStateString(strings, installState, contentAvailable);

  const buttons: JSX.Element[] = [];
  if (game.installState === InstallState.PLAYABLE) {
    buttons.push(
      <div
        key={buttons.length}
        onClick={onUninstallClick}
        className='play-button__dropdown-content'>
        {strings.browse.uninstallGame}
      </div>
    );
  }
  if (game.installState === InstallState.DOWNLOADED) {
    buttons.push(
      <div
        key={buttons.length}
        onClick={onDeleteInstallerClick}
        className='play-button__dropdown-content'>
        {strings.browse.deleteInstaller}
      </div>
    );
    buttons.push(
      <div
        key={buttons.length}
        onClick={onMakeCurationClick}
        className='play-button__dropdown-content'>
        {strings.browse.makeCuration}
      </div>
    );
  }

  return (
    <div className='play-button__wrapper'>
      <input
        type='button'
        value={text}
        onClick={onPlayClick}
        className={'simple-button play-button ' + `play-button__${key}`}
        { ...rest } />
      <div className='play-button__dropdown'>
        <input
          type='button'
          value={'▼'}
          className={'simple-button play-button__context ' + `play-button__${key}`} />
        <div className='play-button__dropdown-content__wrapper'>
          {buttons}
        </div>
      </div>
    </div>
  );
}