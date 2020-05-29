import { ContentServer } from '@database/entity/ContentServer';
import { action } from 'typesafe-actions';
import { ContentServerActions } from './types';

export const setContentServers = (contentServers: ContentServer[]) => action(ContentServerActions.SET_CONTENT_SERVERS, contentServers);
