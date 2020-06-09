import { action } from 'typesafe-actions';
import { SearchActions, SearchQuery } from './types';

export const setQuery = (query: SearchQuery) => action(SearchActions.SET_QUERY, query);
export const toggleAdvSearch = () => action(SearchActions.TOGGLE_ADV_SEARCH);
