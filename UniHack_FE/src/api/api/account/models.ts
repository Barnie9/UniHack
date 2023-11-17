import { Nullable } from '../types';

export interface AccountSettings {
	timezone: Nullable<string>;
	profile_image?: string;
}

export interface Timezone {
	name: string;
	short_name: string;
	offset: string;
}

export interface User {
	user_id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	created_date: string;
	role_id: string;
	status: boolean;
}
