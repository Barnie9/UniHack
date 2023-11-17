import { ThunkAction, ThunkDispatch as Dispatch } from "redux-thunk";
// import { ApiFactory } from 'api';
import { ApplicationState } from "./root";

import { Actions as AuthActions } from "./auth";

import { Actions as AccountActions } from "./data/account";

import { Actions as ActivitiesActions } from "./ui/activities";

export type ApplicationActions =
  | AuthActions
  | AccountActions
  | ActivitiesActions;

export type Thunk = ThunkAction<
  Promise<void>,
  ApplicationState,
  ThunkContext,
  ApplicationActions
>;
export type ThunkDispatch = Dispatch<
  ApplicationState,
  ThunkContext,
  ApplicationActions
>;

export interface ThunkContext {
  api: any;
}

export type ActionPayload<A extends { payload: A["payload"] }> = A["payload"];

export type Action<T, P = null> = T & P extends { type: T; payload: P }
  ? {
      type: T;
    }
  : {
      type: T;
      payload: P;
    };
