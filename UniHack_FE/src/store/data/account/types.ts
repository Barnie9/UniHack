import { Action } from "redux";
// import { AccountSettings, Metadata, GetAccountSettingsData, User } from 'api';
import { User } from "api";
import { Nullable } from "types";

export interface AccountMetadata {
  passwordChanged: boolean;
}

export interface State {
  metadata: AccountMetadata;
  // settings: AccountSettings;
  user: Nullable<User>;
  usersIds: number[];
  userById: { [key: number]: User };
}

export enum ActionType {
  GET_USER = "user/GET_USER",
  UPDATE_USER = "data/account/UPDATE_USER",
  GET_SETTINGS = "data/account/GET_SETTINGS",
  UPDATE_SETTINGS = "data/account/UPDATE_SETTINGS",
  SET_ACCOUNT_METADATA = "data/account/SET_ACCOUNT_METADATA",
  DELETE_ACCOUNT = "data/account/DELETE_ACCOUNT",
  GET_USERS = "data/users/GET_USERS",
  GET_ONE = "data/users/GET_ONE",
  REMOVE_USER = "data/users/REMOVE_USER",
  UPDATE_USER_AD = "data/users/UPDATE_USER_AD",
}

export interface GetUserAction extends Action {
  type: ActionType.GET_USER;
  payload: {
    user: User;
  };
}

export interface UpdateUserAction extends Action {
  type: ActionType.UPDATE_USER;
  payload: {
    user: Partial<User>;
  };
}

export interface UpdateUserAdAction extends Action {
  type: ActionType.UPDATE_USER_AD;
  payload: {
    user: User;
  };
}

export interface RemoveUserAction extends Action {
  type: ActionType.REMOVE_USER;
  payload: {
    user: User;
  };
}

export interface GetUsersAction extends Action {
  type: ActionType.GET_USERS;
  payload: {
    results: User[];
  };
}

export interface GetOneAction extends Action {
  type: ActionType.GET_ONE;
  payload: {
    results: User;
  };
}

export interface GetSettingsAction extends Action {
  type: ActionType.GET_SETTINGS;
  payload: {
    // settings: AccountSettings;
  };
}

export interface UpdateSettingsAction extends Action {
  type: ActionType.UPDATE_SETTINGS;
  payload: {
    // settings: GetAccountSettingsData;
  };
}

export interface SetAccountMetadataAction extends Action {
  type: ActionType.SET_ACCOUNT_METADATA;
  payload: {
    metadata: Partial<AccountMetadata>;
  };
}

export interface DeleteAccountAction extends Action {
  type: ActionType.DELETE_ACCOUNT;
}

export type Actions =
  | GetUserAction
  | UpdateUserAction
  | GetSettingsAction
  | UpdateSettingsAction
  | SetAccountMetadataAction
  | DeleteAccountAction
  | GetUsersAction
  | GetOneAction
  | UpdateUserAdAction
  | RemoveUserAction;
