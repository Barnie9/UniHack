import produce from "immer";
import { set } from "lodash";
import initialState from "./initialState";
import { ActionType, Actions, State } from "./types";
import { Storage } from "helpers";
import {
  ActionType as AuthActionType,
  Actions as AuthActions,
} from "../../auth/types";

export default (
  state: State = initialState,
  action: Actions | AuthActions
): State => {
  switch (action.type) {
    case AuthActionType.CHANGE_PASSWORD: {
      return produce(state, (draft) => {
        draft.metadata.passwordChanged = true;
        console.log(draft.metadata.passwordChanged);
      });
    }

    case AuthActionType.CONFIRM_PASSWORD_RESET: {
      return produce(state, (draft) => {
        draft.metadata.passwordChanged = true;
      });
    }

    case ActionType.GET_USER: {
      return produce(state, (draft) => {
        draft.user = action.payload.user;
      });
    }

    case ActionType.GET_USERS: {
      const users = action.payload.results;

      return produce(state, (draft) => {
        users.forEach((user) => {
          draft.userById[user.user_id] = user;
          if (!draft.usersIds.includes(user.user_id)) {
            draft.usersIds.push(user.user_id);
          }
        });
      });
    }

    case ActionType.REMOVE_USER: {
      const user = action.payload.user;
      return produce(state, (draft) => {
        delete draft.userById[user.user_id];
        if (draft.usersIds.includes(user.user_id)) {
          draft.usersIds = draft.usersIds.filter((u) => u !== user.user_id);
        }
      });
    }

    case ActionType.UPDATE_USER_AD: {
      const user = action.payload.user;
      console.log(user);
      return produce(state, (draft) => {
        draft.userById[user.user_id] = user;
        console.log(draft.userById[user.user_id]);
        if (!draft.usersIds.includes(user.user_id)) {
          draft.usersIds.push(user.user_id);
        }
      });
    }

    case ActionType.GET_ONE: {
      const user = action.payload.results;

      return produce(state, (draft) => {
        draft.userById[user.user_id] = user;
        if (!draft.usersIds.includes(user.user_id)) {
          draft.usersIds.push(user.user_id);
        }
      });
    }

    case ActionType.UPDATE_USER: {
      return produce(state, (draft) => {
        const { user } = draft;

        if (user) {
          Object.entries(action.payload.user).forEach(([key, value]) => {
            if (value !== undefined) set(user, key, value);
          });
        }
      });
    }

    // case ActionType.GET_SETTINGS: {
    // 	if (action.payload.settings.timezone) {
    // 		Storage.set(k => k.Timezone, action.payload.settings.timezone);
    // 		setDefaultTimezone(action.payload.settings.timezone);
    // 	}
    // 	return produce(state, draft => {
    // 		draft.settings = action.payload.settings;
    // 	});
    // }

    // case ActionType.UPDATE_SETTINGS: {
    // 	if (action.payload.settings.timezone) {
    // 		Storage.set(k => k.Timezone, action.payload.settings.timezone);
    // 		setDefaultTimezone(action.payload.settings.timezone);
    // 	}
    // 	return produce(state, draft => {
    // 		Object.entries(action.payload.settings).forEach(([key, value]) => {
    // 			if (value !== undefined) set(draft.settings, key, value);
    // 		});
    // 	});
    // }

    case ActionType.SET_ACCOUNT_METADATA: {
      return produce(state, (draft) => {
        const { metadata } = draft;

        Object.entries(action.payload.metadata).forEach(([key, value]) => {
          if (value !== undefined) set(metadata, key, value);
        });
      });
    }

    default: {
      return state;
    }
  }
};
