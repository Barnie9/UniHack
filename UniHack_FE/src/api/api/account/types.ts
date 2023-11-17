import { Nullable, Metadata, RequireAtLeastOne } from '../types';
import { AccountSettings, Timezone, User } from './models';

export interface DeleteAccountInput {
	username: string;
	password: string;
}

export interface GetAccountSettingsData extends AccountSettings {
	profile_image_width?: number;
	profile_image_height?: number;
}

export interface UpdateAccountSettingsInput {
	timezone: Nullable<string>;
	profile_image?: Blob;
}

export interface SearchTimezonesInput {
	q?: string;
}

export interface SearchTimezonesData extends Metadata {
	results: Timezone[];
}

export type GetUserData = User;

export type UpdateUserInput = RequireAtLeastOne<User>;
