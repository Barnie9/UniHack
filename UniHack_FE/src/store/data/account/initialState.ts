// import { Storage } from 'helpers';
import { State } from './types';

const timezone =  Intl.DateTimeFormat().resolvedOptions().timeZone;

const initialState: State = {
	metadata: {
		passwordChanged: false
	},
	// settings: {
	// 	timezone,
	// 	profile_image: ''
	// },
	user: null,
	usersIds: [],
	userById: {},
};

export default initialState;
