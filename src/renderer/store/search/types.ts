export interface SearchQuery {
  text: string;
}

export const enum SearchActions {
  SET_QUERY = '@@search/SET_QUERY',
  TOGGLE_ADV_SEARCH = '@@search/TOGGLE_ADV_SEARCH'
}

export interface SearchState {
  readonly query: SearchQuery;
  readonly advSearchOpen: boolean;
}
