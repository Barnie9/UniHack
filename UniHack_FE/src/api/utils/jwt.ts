import decode from 'jwt-decode';

export interface TokenPayload {
	email: string;
	exp: number;
	orig_iat: number;
	user_id: number;
	username: string;
}

export const jwt = {
	decode: function(token: string) {
		return decode<TokenPayload>(token);
	},
	hasExpired: function(token: string) {
		const { exp } = jwt.decode(token);
		const now = Math.round(new Date().getTime() / 1000);

		if (now > exp) {
			return true;
		}

		return false;
	},
	shouldRefresh: function(token: string) {
		const { exp } = jwt.decode(token);
		const now = Math.round(new Date().getTime() / 1000);

		if (exp - 518400 < now && now < exp) {
			return true;
		}

		return false;
	}
};
