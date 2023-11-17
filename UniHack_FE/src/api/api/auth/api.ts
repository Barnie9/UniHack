import { GetSignUpData, PendingSignUpData } from './types';
import { AuthRequestConfig } from '../../generics';
import { axios, buildUrl } from '../../utils';
import { Credentials } from './models';
import {
	LoginData,
	ChangePasswordInput,
	ResetPasswordInput,
	ConfirmPasswordResetInput,
	SignUpInput
} from './types';

const endpoints = {
	login: '/user/login',
	// refresh: '/auth/jwt/refresh/',
	password: {
		change: '/user/password/change/',
		reset: '/auth/password/reset/',
		confirm: '/auth/password/reset/confirm/'
	},
	signup: '/user/signup',
	singupComplete: (id: string) => `/user/signup/${id}/complete`,
};

export default (config?: AuthRequestConfig) => ({
	login: async function({ username, password }: Credentials) {
		const url = buildUrl(endpoints.login);
		const { data } = await axios.post<LoginData>(url, { username, password });
		return data;
	},
	// refresh: async function({ refresh }: RefreshTokenInput) {
	// 	const url = buildUrl(endpoints.refresh);
	// 	const { data } = await axios.post<RefreshTokenData>(url, { refresh });
	// 	return data.access;
	// },
	changePassword: async function(input: ChangePasswordInput) {
		if (config) {
			const url = buildUrl(endpoints.password.change);
			await axios.post(url, input, { token: config.token });
		}
	},
	resetPassword: async function(input: ResetPasswordInput) {
		const url = buildUrl(endpoints.password.reset);
		await axios.post(url, input);
	},
	confirmPasswordReset: async function(input: ConfirmPasswordResetInput) {
		const url = buildUrl(endpoints.password.confirm);
		await axios.post(url, input);
	},
	signup: async function(input: SignUpInput) {
		const url = buildUrl( endpoints.signup);
		const { data } = await axios.post<GetSignUpData>(url, input);
		return data;
	},
	signupComplete: async function(id: string) {
		const url = buildUrl(endpoints.singupComplete(id));
		const { data } = await axios.get<PendingSignUpData>(url);
		return data;
	}
});
