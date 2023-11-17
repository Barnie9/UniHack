import initialState from "./initialState";
import { produce } from "immer";
import { ActionType, Actions, State } from "./types";

export default (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.LOGIN: {
      const session = action.payload;
      return produce(state, (draft) => {
        draft.session = { ...session };
      });
    }

    case ActionType.SIGN_UP: {
      const { id } = action.payload;

      return produce(state, (draft) => {
        draft.signUp.id = id;
        draft.signUp.completed = false;
      });
    }

    case ActionType.PENDING_SIGN_UP: {
      const { completed } = action.payload;

      return produce(state, (draft) => {
        draft.signUp.completed = completed;
      });
    }

    case ActionType.LOGOUT: {
      return produce(state, (draft) => {
        draft.session = null;
      });
    }

    case ActionType.REFRESH_TOKEN: {
      const { access } = action.payload;

      return produce(state, (draft) => {
        if (draft.session) {
          draft.session.token = access;
        }
      });
    }

    default: {
      return state;
    }
  }
};
