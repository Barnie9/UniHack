import * as yup from 'yup';

import { PHONE_REGEX_WITH_PLUS_PREFIX } from 'consts';

export function getNewPasswordValidationSchema(hasPhoneNumber: boolean) {
	const password = yup
		.string()
		.required('Please enter your password')
		.min(16, 'Password must be at least 16 characters long')
		.matches(/[a-z]/, 'At least a lowercase character')
		.matches(/[A-Z]/, 'At least an uppercase character')
		.matches(/[0-9]/, 'At least a digit');
	const confirmPassword = yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password'), null], 'Passwords must match');
	const phone = yup
		.string()
		.required('Please enter your phone number')
		.min(8, 'Please enter a valid phone number')
		.max(15, 'Please enter a valid phone number')
		.matches(PHONE_REGEX_WITH_PLUS_PREFIX, 'Please enter a valid phone number');

	return yup.object({
		password,
		confirmPassword,
		...(hasPhoneNumber && { phone })
	});
}

export function getResetPasswordValidationSchema() {
	const password = yup
		.string()
		.required('Please enter your password')
		.min(16, 'Password must be at least 16 characters long')
		.matches(/[a-z]/, 'At least a lowercase character')
		.matches(/[A-Z]/, 'At least an uppercase character')
		.matches(/[0-9]/, 'At least a digit');
	const confirmPassword = yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password'), null], 'Passwords must match');
	const code = yup.string().required('Please enter the code').min(6, 'Please enter a valid code');

	return yup.object({
		password,
		confirmPassword,
		code
	});
}

export function sanatizeCode(code: string, maxLength?: number) {
	code = code.replace(/[^0-9]+/g, '');

	if (maxLength) code = code.substr(0, maxLength);

	return code;
}

export function formatPhoneNumber(phoneNumber: string) {
	if (!phoneNumber.length) return '';

	// filter everything except '+' and number characters from 0 to 9
	phoneNumber = phoneNumber.replace(/[^+0-9]+/g, '');

	// if number does not start with 0 and number characters from 1 to 9
	if (!phoneNumber.startsWith('0') && phoneNumber.match(/[1-9]+/g))
		phoneNumber = '+' + phoneNumber;

	if (!phoneNumber.startsWith('00') && phoneNumber.startsWith('0') && phoneNumber.length > 1) {
		phoneNumber = '+' + phoneNumber;
	}

	// change '00' to '+'
	if (phoneNumber.startsWith('00')) phoneNumber = phoneNumber.replace(/^.{2}/g, '+');

	// validate number
	if (phoneNumber.startsWith('+')) {
		// filter everything except numbers
		phoneNumber = phoneNumber.replace(/[^0-9]+/g, '');
		// match every 0 from the begining until 1-9 is found and remove them
		phoneNumber = phoneNumber.replace(/[^1-9]*/, '');
		// add + sign
		phoneNumber = `+${phoneNumber}`;
	}

	return phoneNumber;
}
