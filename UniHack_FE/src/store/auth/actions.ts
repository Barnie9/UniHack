import { ActionCreator } from "redux";
import {
  ChangePasswordInput,
  ConfirmPasswordResetInput,
  Credentials,
  GetSignUpData,
  ResetPasswordInput,
  SignUpInput,
  PendingSignUpData,
} from "api";
// @ts-ignore
import uuid from "uuid/v4";

// import { EnvVariables } from 'env';
import { Storage } from "helpers";
import { Thunk } from "store/types";
import { beginActivity, endActivity, setError } from "store/ui/activities";

import {
  ActionType,
  AuthSession,
  LoginAction,
  LogoutAction,
  RefreshTokenAction,
  ChangePasswordAction,
  ConfirmPasswordResetAction,
  ResetPasswordAction,
  SignUpAction,
  PendingSignUpAction,
} from "./types";

const signUpAction = (data: GetSignUpData): SignUpAction => ({
  type: ActionType.SIGN_UP,
  payload: {
    ...data,
  },
});

export const signUp =
  (input: SignUpInput): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({
          type: ActionType.SIGN_UP,
          uuid: activityId,
        })
      );

      const data = await context.api.auth().signup(input);
      dispatch(signUpAction(data));
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.SIGN_UP,
          message: e.response.data.message,
          uuid: activityId,
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const pendingSignUpAction = ({
  completed,
}: PendingSignUpData): PendingSignUpAction => ({
  type: ActionType.PENDING_SIGN_UP,
  payload: {
    completed,
  },
});

export const pendingSignUp =
  (id: string): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({
          type: ActionType.PENDING_SIGN_UP,
          uuid: activityId,
        })
      );

      const data = await context.api.auth().signupComplete(id);
      dispatch(pendingSignUpAction(data));
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.PENDING_SIGN_UP,
          message: e.response.data.message,
          uuid: activityId,
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const loginAction: ActionCreator<LoginAction> = (session: AuthSession) => ({
  type: ActionType.LOGIN,
  payload: session,
});

export const login =
  (creds: Credentials): Thunk =>
  async (dispatch, _, context) => {
    const activityId = uuid();

    try {
      dispatch(beginActivity({ type: ActionType.LOGIN, uuid: activityId }));
      const { access, refresh } = await context.api.auth().login(creds);
      Storage.set((k) => k.AccessToken, access);
      Storage.set((k) => k.RefreshToken, refresh);
      Storage.set((k) => k.Username, creds.username);
      dispatch(
        loginAction({ token: access, refresh, username: creds.username })
      );
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.LOGIN,
          message: e.response.data.message,
          status: e.response.status,
          uuid: uuid(),
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const logoutAction: ActionCreator<LogoutAction> = () => ({
  type: ActionType.LOGOUT,
});

export const logout = (): Thunk => async (dispatch) => {
  try {
    Storage.remove((k) => [k.AccessToken, k.RefreshToken, k.Username]);
    dispatch(logoutAction());
  } catch (e) {
    dispatch(
      setError({
        type: ActionType.LOGOUT,
        message: e.response.data.message,
        uuid: uuid(),
      })
    );
  }
};

const refreshTokenAction: ActionCreator<RefreshTokenAction> = (
  access: string
) => ({
  type: ActionType.REFRESH_TOKEN,
  payload: {
    access,
  },
});

export const refreshToken =
  (access: string): Thunk =>
  async (dispatch, getState) => {
    try {
      const { session } = getState().auth;

      if (session) {
        Storage.set((k) => k.AccessToken, access);
        dispatch(refreshTokenAction(access));
      }
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.REFRESH_TOKEN,
          message: e.response.data.message,
          uuid: uuid(),
        })
      );
    }
  };

const changePasswordAction: ActionCreator<ChangePasswordAction> = () => ({
  type: ActionType.CHANGE_PASSWORD,
});

export const changePassword =
  (input: ChangePasswordInput): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({ type: ActionType.CHANGE_PASSWORD, uuid: activityId })
      );
      const { session } = getState().auth;

      if (session) {
        await context.api.auth({ token: session.token }).changePassword(input);
        dispatch(changePasswordAction());
      }
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.CHANGE_PASSWORD,
          message: e.response.data.message,
          uuid: uuid(),
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const resetPasswordAction: ActionCreator<ResetPasswordAction> = () => ({
  type: ActionType.RESET_PASSWORD,
});

export const resetPassword =
  (input: ResetPasswordInput): Thunk =>
  async (dispatch, _, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({ type: ActionType.RESET_PASSWORD, uuid: activityId })
      );
      await context.api.auth().resetPassword(input);
      dispatch(resetPasswordAction());
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.RESET_PASSWORD,
          message: e.response.data.message,
          uuid: uuid(),
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const confirmPasswordResetAction: ActionCreator<
  ConfirmPasswordResetAction
> = () => ({
  type: ActionType.CONFIRM_PASSWORD_RESET,
});

export const confirmPasswordReset =
  (input: ConfirmPasswordResetInput): Thunk =>
  async (dispatch, _, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({
          type: ActionType.CONFIRM_PASSWORD_RESET,
          uuid: activityId,
        })
      );
      await context.api.auth().confirmPasswordReset(input);
      dispatch(confirmPasswordResetAction());
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.CONFIRM_PASSWORD_RESET,
          message: e.response.data.message,
          uuid: uuid(),
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };
