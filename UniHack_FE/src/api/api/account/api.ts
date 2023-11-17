import { AuthRequestConfig } from "../../generics";
import { axios, buildUrl } from "../../utils";
import { User } from "./models";
import {
  DeleteAccountInput,
  GetAccountSettingsData,
  UpdateAccountSettingsInput,
  SearchTimezonesInput,
  SearchTimezonesData,
  GetUserData,
  UpdateUserInput,
} from "./types";

const endpoints = {
  delete: "/user/delete/",
  settings: "/account/settings/",
  timezone: "/timezone/search/",
  user: (username: string) => `/user/${username}`,
  edit: (id: number) => `/user/${id}`,
  users: "/users",
  deleteUser: (id: number) => `/users/${id}`,
  update: (id: number) => `/user/admin/${id}`,
  getOne: (id: number) => `/users/${id}`,
};

export default ({ token }: AuthRequestConfig) => ({
  deleteAccount: async function(input: DeleteAccountInput) {
    const url = buildUrl(endpoints.delete);
    await axios.post(url, input, { token });
  },
  deleteUser: async function(input: number) {
    const url = buildUrl(endpoints.deleteUser(input));
    const { data } = await axios.delete<User>(url, { token });
    return data;
  },
  getSettings: async function() {
    const url = buildUrl(endpoints.settings);
    const { data } = await axios.get<GetAccountSettingsData>(url, {
      token,
    });
    return data;
  },
  updateSettings: async function(input: UpdateAccountSettingsInput) {
    const url = buildUrl(endpoints.settings);
    const { data } = await axios.patch<GetAccountSettingsData>(url, input, {
      token,
    });
    return data;
  },
  searchTimezones: async function(params?: SearchTimezonesInput) {
    const url = buildUrl(endpoints.timezone);
    const { data } = await axios.get<SearchTimezonesData>(url, {
      params,
      token,
    });
    return data;
  },
  getUser: async function(username: string) {
    const url = buildUrl(endpoints.user(username));
    const { data } = await axios.get<GetUserData>(url, { token });
    return data;
  },
  getOne: async function(id: number) {
    const url = buildUrl(endpoints.getOne(id));
    const { data } = await axios.get<GetUserData>(url, { token });
    return data;
  },
  getUsers: async function() {
    const url = buildUrl(endpoints.users);
    const { data } = await axios.get<GetUserData[]>(url, { token });
    return data;
  },
  updateUser: async function(input: UpdateUserInput) {
    const { user_id, ...data } = input;
    if (user_id) {
      const url = buildUrl(endpoints.edit(user_id));
      await axios.patch(url, data, { token });
    }
  },
  updateUserByAdmin: async function(input: UpdateUserInput) {
    const { user_id, ...i } = input;
    if (user_id) {
      const url = buildUrl(endpoints.update(user_id));
      const { data } = await axios.patch<User>(url, i, { token });
      return data;
    }
  },
});
