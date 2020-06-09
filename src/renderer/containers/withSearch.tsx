import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../store';
import { SearchQuery } from '../store/search';
import * as searchActions from '../store/search/actions';

type StateToProps = {
  /** Query of the most recent search. */
  searchQuery: SearchQuery;
  /** Whether the advanced search box is open */
  advSearchOpen: boolean;
};

type DispatchToProps = {
  /** Called when the user attempts to make a search. */
  onSearch: (text: string) => void;
  /** Toggle the advanced search box open or closed */
  onToggleAdvSearch: () => void;
};

export type WithSearchProps = StateToProps & DispatchToProps;

const mapStateToProps = ({ search }: ApplicationState): StateToProps => ({
  searchQuery: search.query,
  advSearchOpen: search.advSearchOpen
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onSearch: (text: string) => searchActions.setQuery({ text }),
  onToggleAdvSearch: () => searchActions.toggleAdvSearch()
}, dispatch);

export const withSearch = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { getDisplayName: name => 'withSearch('+name+')' }
);
