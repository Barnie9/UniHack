
// import { EnvVariables } from 'env';
import { Storage } from "helpers";
import { Nullable } from "types";

import { State, AuthSession } from "./types";

const access = Storage.get((k) => k.AccessToken);
const refresh = Storage.get((k) => k.RefreshToken);
const username = Storage.get((k) => k.Username);

let session: Nullable<AuthSession> = null;

if (access && refresh && username) {
  session = {
    token: access,
    refresh,
    username,
  };
}

const initialState: State = {
  session,
  signUp: {
    id: null,
    completed: null,
  },
};

export default initialState;
