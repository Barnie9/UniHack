import { ActionCreator } from "redux";
import { DeleteAccountInput, UpdateUserInput, User } from "api";
// @ts-ignore
import uuid from "uuid/v4";

import { Storage } from "helpers";
import { logout } from "store/auth";
import { Thunk } from "store/types";
import { beginActivity, endActivity, setError } from "store/ui/activities";

import {
  AccountMetadata,
  ActionType,
  DeleteAccountAction,
  GetUserAction,
  SetAccountMetadataAction,
  UpdateUserAction,
  GetUsersAction,
  GetOneAction,
  RemoveUserAction,
  UpdateUserAdAction,
} from "./types";

const getUsersAction = (results: User[]): GetUsersAction => ({
  type: ActionType.GET_USERS,
  payload: {
    results,
  },
});

export const getUsers = (): Thunk => async (dispatch, getState, context) => {
  const activityId = uuid();

  try {
    dispatch(
      beginActivity({
        type: ActionType.GET_USERS,
        uuid: activityId,
      })
    );

    const { session } = getState().auth;

    if (session) {
      const data = await await context.api.data
        .account({ token: session.token })
        .getUsers();
      dispatch(getUsersAction(data));
    }
  } catch (e) {
    dispatch(
      setError({
        type: ActionType.GET_USERS,
        message: e.response.data.message,
        uuid: activityId,
      })
    );
  } finally {
    dispatch(endActivity({ uuid: activityId }));
  }
};

const getOneAction = (results: User): GetOneAction => ({
  type: ActionType.GET_ONE,
  payload: {
    results,
  },
});

export const getOne =
  (input: number): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({
          type: ActionType.GET_ONE,
          uuid: activityId,
        })
      );

      const { session } = getState().auth;
      if (session) {
        const data = await await context.api.data
          .account({ token: session.token })
          .getOne(input);
        dispatch(getOneAction(data));
      }
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.GET_ONE,
          message: e.response.data.message,
          uuid: activityId,
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const removeUserAction = (user: User): RemoveUserAction => ({
  type: ActionType.REMOVE_USER,
  payload: {
    user,
  },
});

export const removeUser =
  (input: number): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({
          type: ActionType.REMOVE_USER,
          uuid: activityId,
        })
      );

      const { session } = getState().auth;
      if (session) {
        const data = await await context.api.data
          .account({ token: session.token })
          .deleteUser(input);
        dispatch(removeUserAction(data));
      }
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.REMOVE_USER,
          message: e.response.data.message,
          uuid: activityId,
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const updateUserAdAction = (user: User): UpdateUserAdAction => ({
  type: ActionType.UPDATE_USER_AD,
  payload: {
    user,
  },
});

export const updateUserAd =
  (input: UpdateUserInput): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({
          type: ActionType.UPDATE_USER_AD,
          uuid: activityId,
        })
      );

      const { session } = getState().auth;
      if (session) {
        const data = await await context.api.data
          .account({ token: session.token })
          .updateUserByAdmin(input);
        console.log(data);
        dispatch(updateUserAdAction(data));
      }
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.UPDATE_USER_AD,
          message: e.response.data.message,
          uuid: activityId,
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const getUserAction: ActionCreator<GetUserAction> = (user: User) => ({
  type: ActionType.GET_USER,
  payload: {
    user,
  },
});

export const getUser = (): Thunk => async (dispatch, getState, context) => {
  const activityId = uuid();

  try {
    dispatch(beginActivity({ type: ActionType.GET_USER, uuid: activityId }));
    const { session } = getState().auth;

    if (session) {
      const username = Storage.get((k) => k.Username);
      const data = await context.api.data
        .account({ token: session.token })
        .getUser(username);
      dispatch(getUserAction(data));
    }
  } catch (e) {
    dispatch(
      setError({
        type: ActionType.GET_USER,
        message: e.response.data.message,
        uuid: uuid(),
      })
    );
  } finally {
    dispatch(endActivity({ uuid: activityId }));
  }
};

const updateUserAction: ActionCreator<UpdateUserAction> = (
  user: Partial<User>
) => ({
  type: ActionType.UPDATE_USER,
  payload: {
    user,
  },
});

export const updateUser =
  (input: UpdateUserInput): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({ type: ActionType.UPDATE_USER, uuid: activityId })
      );
      const { session } = getState().auth;

      if (session) {
        await context.api.data
          .account({ token: session.token })
          .updateUser(input);
        dispatch(updateUserAction(input));
      }
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.UPDATE_USER,
          message: e.response.data.message,
          uuid: uuid(),
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };

const setAccountMetadataAction: ActionCreator<SetAccountMetadataAction> = (
  metadata: Partial<AccountMetadata>
) => ({
  type: ActionType.SET_ACCOUNT_METADATA,
  payload: {
    metadata,
  },
});

export const setAccountMetadata =
  (metadata: Partial<AccountMetadata>): Thunk =>
  async (dispatch) => {
    try {
      dispatch(setAccountMetadataAction(metadata));
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.SET_ACCOUNT_METADATA,
          message: e.response.data.message,
          uuid: uuid(),
        })
      );
    }
  };

const deleteAccountAction: ActionCreator<DeleteAccountAction> = () => ({
  type: ActionType.DELETE_ACCOUNT,
});

export const deleteAccount =
  (input: DeleteAccountInput): Thunk =>
  async (dispatch, getState, context) => {
    const activityId = uuid();

    try {
      dispatch(
        beginActivity({ type: ActionType.DELETE_ACCOUNT, uuid: activityId })
      );
      const { session } = getState().auth;

      if (session) {
        await context.api.data
          .account({ token: session.token })
          .deleteAccount(input);
        dispatch(deleteAccountAction());
        dispatch(logout());
      }
    } catch (e) {
      dispatch(
        setError({
          type: ActionType.DELETE_ACCOUNT,
          message: e.response.data.message,
          uuid: uuid(),
        })
      );
    } finally {
      dispatch(endActivity({ uuid: activityId }));
    }
  };
