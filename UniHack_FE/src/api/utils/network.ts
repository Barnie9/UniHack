import axios, { AxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';

interface CustomRequestConfig extends AxiosRequestConfig {
	token?: string;
}

export const instance = axios.create<CustomRequestConfig>({
	headers: {
		'Content-Type': 'application/json'
	},
	paramsSerializer: params => {
		let result = '';
		Object.keys(params).forEach(key => {
			result += `${key}=${encodeURIComponent(params[key])}&`;
		});
		return result.substr(0, result.length - 1);
	},
	// timeout: 20000
});

instance.interceptors.request.use(async request => {
	try {
		if (request.token) {
			request.headers.Authorization = `Bearer ${request.token}`;
			delete request.token;
		}

		if (request.data && !isEmpty(request.data)) {
			Object.keys(request.data).forEach(key => {
				if (request.data[key] === undefined || request.data[key] === null) {
					delete request.data[key];
				}
			});
		}

		if (request.params && !isEmpty(request.params)) {
			Object.keys(request.params).forEach(key => {
				if (request.params[key] === undefined || request.params[key] === null) {
					delete request.params[key];
				}
			});
		}
	} catch (error) {
		console.log('Failed to execute the request: ', error);
	}

	return request;
});


export function buildUrl(endpoint = '') {
	let url = `http://localhost:5000/api${endpoint}`;

	// if (url.charAt(url.length - 1) !== '/') url = `${url}/`;
	return url;
}