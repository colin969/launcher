import { Reducer } from 'redux';
import { SearchActions, SearchState } from './types';
import { deepCopy } from '@shared/Util';

const initialState: SearchState = {
  query: { text: '' },
  advSearchOpen: false
};

const reducer: Reducer<SearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchActions.SET_QUERY: {
      return { ...state, query: action.payload };
    }
    case SearchActions.TOGGLE_ADV_SEARCH: {
      return { ...state, advSearchOpen: !state.advSearchOpen };
    }
    default: {
      return state;
    }
  }
};

export { reducer as searchReducer };
