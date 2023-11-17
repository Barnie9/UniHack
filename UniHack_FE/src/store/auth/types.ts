import { Action } from "redux";
import { PendingSignUpData, GetSignUpData } from "api";

import { ActionWithPayload, Nullable } from "types";

export interface AuthSession {
  token: string;
  refresh: string;
  username: string;
}

export interface State {
  session: Nullable<AuthSession>;
  signUp: {
    id: Nullable<string>;
    completed: Nullable<boolean>;
  };
}

export enum ActionType {
  LOGIN = "user/LOGIN",
  LOGOUT = "user/LOGOUT",
  REFRESH_TOKEN = "user/REFRESH_TOKEN",
  CHANGE_PASSWORD = "user/CHANGE_PASSWORD",
  RESET_PASSWORD = "user/RESET_PASSWORD",
  CONFIRM_PASSWORD_RESET = "user/CONFIRM_PASSWORD_RESET",
  SIGN_UP = "user/SIGN_UP",
  PENDING_SIGN_UP = "user/PENDING_SIGN_UP",
  GET_ACCOUNT_STATUS = "user/GET_ACCOUNT_STATUS",
}

export type PendingSignUpAction = ActionWithPayload<
  ActionType.PENDING_SIGN_UP,
  PendingSignUpData
>;
export type SignUpAction = ActionWithPayload<ActionType.SIGN_UP, GetSignUpData>;
export type LoginAction = ActionWithPayload<ActionType.LOGIN, AuthSession>;

export type LogoutAction = Action<ActionType.LOGOUT>;

export type RefreshTokenAction = ActionWithPayload<
  ActionType.REFRESH_TOKEN,
  { access: string }
>;

export type ChangePasswordAction = Action<ActionType.CHANGE_PASSWORD>;
export type ResetPasswordAction = Action<ActionType.RESET_PASSWORD>;
export type ConfirmPasswordResetAction = Action<
  ActionType.CONFIRM_PASSWORD_RESET
>;

export type Actions =
  | LoginAction
  | LogoutAction
  | RefreshTokenAction
  | ChangePasswordAction
  | ResetPasswordAction
  | ConfirmPasswordResetAction
  | SignUpAction
  | PendingSignUpAction;
