import { combineReducers } from "redux";

import {
  State as Auth,
  reducer as auth,
  ActionType as AuthActionType,
} from "./auth";

import {
  State as Account,
  reducer as account,
  initialState as initialAccountState,
} from "./data/account";

import { State as Activities, reducer as activities } from "./ui/activities";

import { ApplicationActions } from "./types";

export interface ApplicationState {
  auth: Auth;
  data: {
    account: Account;
  };
  ui: {
    activities: Activities;
  };
}

const appReducer = combineReducers<ApplicationState>({
  auth,
  data: combineReducers({
    account,
  }),
  ui: combineReducers({
    activities,
  }),
});

function rootReducer(
  state: ApplicationState | undefined,
  action: ApplicationActions
) {
  function resetState() {
    if (state) {
      state.data.account = initialAccountState;
    }
  }

  if (state) {
    if (action.type === AuthActionType.LOGOUT) {
      resetState();
    }
  }

  return appReducer(state, action);
}

export default rootReducer;
