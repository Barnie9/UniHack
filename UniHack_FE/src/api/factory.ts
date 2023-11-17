import { AuthRequestConfig } from "./generics";

import { account } from "./api/account";
import { auth } from "./api/auth";

export const factory = () => ({
  auth: (config?: AuthRequestConfig) => auth(config),
  data: {
    account: (config: AuthRequestConfig) => account(config),
  },
});

export type ApiFactory = ReturnType<typeof factory>;
