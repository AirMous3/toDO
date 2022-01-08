import { RequestStatusType } from '../appReducer';
import {
  APP_REDUCER_CHANGE_STATUS,
  APP_REDUCER_SET_APP_ERROR,
  APP_REDUCER_SET_APP_INITIALIZE,
} from '../constants';

export const setAppStatus = (status: RequestStatusType) =>
  ({
    type: APP_REDUCER_CHANGE_STATUS,
    status,
  } as const);

export const setAppError = (error: string | null) =>
  ({
    type: APP_REDUCER_SET_APP_ERROR,
    error,
  } as const);

export const setAppInitialize = (value: boolean) =>
  ({
    type: APP_REDUCER_SET_APP_INITIALIZE,
    value,
  } as const);
