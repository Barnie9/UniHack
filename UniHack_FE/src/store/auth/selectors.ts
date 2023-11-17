import { createSelector } from "reselect";
import { State } from "./types";

export const selectSession = createSelector(
  (state: State) => state.session,
  (session) => session
);

export const selectSignUpId = createSelector(
  (state: State) => state.signUp?.id ?? null,
  (id) => id
);

export const selectSignUpState = createSelector(
  (state: State) => state.signUp?.completed ?? null,
  (c) => c
);
