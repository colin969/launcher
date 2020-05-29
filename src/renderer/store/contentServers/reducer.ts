import { ContentServer } from '@database/entity/ContentServer';
import { Reducer } from 'redux';
import { ContentServerActions } from './types';

const initialState: ContentServer[] = [];

const reducer: Reducer<ContentServer[]> = (state = initialState, action) => {
  switch (action.type) {
    case ContentServerActions.SET_CONTENT_SERVERS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export { reducer as contentServersReducer };

