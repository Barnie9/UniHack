import { AuthPayload } from './models';

export type LoginData = AuthPayload;

export interface GetWorkspacesInput {
	user: string;
}

export interface RefreshTokenData {
	access: string;
}

export interface RefreshTokenInput {
	refresh: string;
}

export interface ChangePasswordInput {
	old_password: string;
	new_password1: string;
	new_password2: string;
	username: string;
}

export interface SignUpInput {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	roleId: number;
	password1: string;
	password2: string; // password confirmation;
}

export interface GetSignUpData {
	id: string;
	username: string;
	email: string;
}

export interface PendingSignUpData {
	completed: boolean;
}
export interface ResetPasswordInput {
	email: string;
	subdomain?: string;
}

export interface ConfirmPasswordResetInput {
	new_password1: string;
	new_password2: string;
	token: string;
	uid: string;
}

export interface AddDeviceTokenInput {
	token: string;
}
