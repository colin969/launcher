import { Subtract } from '@shared/interfaces';
import { ConfigPage, ConfigPageProps } from '../components/pages/ConfigPage';
import { withPreferences, WithPreferencesProps } from './withPreferences';
import { withContentServers, WithContentServersProps } from './withContentServers';

export type ConnectedConfigPageProps = Subtract<ConfigPageProps, WithPreferencesProps & WithContentServersProps>;

export const ConnectedConfigPage = withContentServers(withPreferences(ConfigPage));
