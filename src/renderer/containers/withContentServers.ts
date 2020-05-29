import { ContentServer } from '@database/entity/ContentServer';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../store';
import * as contentServersActions from '../store/contentServers/actions';

type StateToProps = {
  /** Tag Categories Info */
  readonly contentServers: ContentServer[];
};

type DispatchToProps = {
  /** Called when the Tag Categories change */
  setContentServers: (contentServers: ContentServer[]) => void;
};

export type WithContentServersProps = StateToProps & DispatchToProps;

const mapStateToProps = ({ contentServers }: ApplicationState): StateToProps => ({
  contentServers: contentServers,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setContentServers: (contentServers: ContentServer[]) => contentServersActions.setContentServers(contentServers),
}, dispatch);

export const withContentServers = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { getDisplayName: name => 'withContentServers('+name+')' }
);
