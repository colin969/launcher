import { ContentServer } from '@database/entity/ContentServer';
import { TagCategory } from '@database/entity/TagCategory';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { contentServersReducer } from './contentServers';
import { searchReducer, SearchState } from './search';
import { tagCategoriesReducer } from './tagCategories';

// The top-level state object
export interface ApplicationState {
  router: RouterState;
  search: SearchState;
  tagCategories: TagCategory[];
  contentServers: ContentServer[];
}

// Top-level reducer
export const createRootReducer = (history: History) => combineReducers<ApplicationState>({
  router: connectRouter(history),
  search: searchReducer,
  tagCategories: tagCategoriesReducer,
  contentServers: contentServersReducer
});
