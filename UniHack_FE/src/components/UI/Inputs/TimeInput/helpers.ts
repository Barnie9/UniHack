import { format } from 'date-fns';

import { DATE_TIME_TIMEZONE_FORMAT } from 'consts';
import { MERIDIAN_OPTIONS } from './consts';

function convertToLocalTime(value: string) {
	return format(new Date(value), DATE_TIME_TIMEZONE_FORMAT);
}

export function isInViewPort(dropdownRef: React.RefObject<HTMLDivElement>) {
	if (dropdownRef.current) {
		const el = dropdownRef.current.getBoundingClientRect();

		return el.top + el.height < window.innerHeight && el.bottom > 0;
	}
}

export function convert12HourFormatTo24(hours: string, meridianValue: string) {
	const hours_number = parseInt(hours, 10);

	if (hours === '12') {
		if (meridianValue === MERIDIAN_OPTIONS.AM) hours = '00';
		if (meridianValue === MERIDIAN_OPTIONS.PM) hours = '12';
	} else {
		if (meridianValue === MERIDIAN_OPTIONS.PM) {
			hours = `${hours_number + 12}`;
		} else if (hours_number < 10) {
			hours = `0${hours}`;
		}
	}

	return hours;
}

export function getDateInformation(value: string) {
	const data = {
		h: '',
		m: '',
		timezone: getCurrentTimezoneOffset(),
		meridianValue: ''
	};

	if (value) {
		const dateNow = new Date().toISOString().split('T')[0];
		const dateTime = new Date(`${dateNow}T${value}`);

		const hours_number = dateTime.getHours();
		const hours_24 = pad(hours_number);
		const minutes = pad(dateTime.getMinutes());
		const timezone = getTimezoneISOString(dateTime);
		const meridianValue = isAM(hours_number) ? MERIDIAN_OPTIONS.AM : MERIDIAN_OPTIONS.PM;

		data.h = hours_24;
		data.m = minutes;
		data.timezone = timezone;
		data.meridianValue = meridianValue;
	}

	return data;
}

export function getCurrentTimezoneOffset() {
	return convertToLocalTime(new Date().toISOString()).slice(-5);
}

function getTimezoneISOString(date: Date) {
	const timezoneOffset = -date.getTimezoneOffset();
	const dif = timezoneOffset >= 0 ? '+' : '-';

	return (
		dif + pad(Math.floor(Math.abs(timezoneOffset) / 60)) + pad(Math.abs(timezoneOffset) % 60)
	);
}

/**
 * Prepends `0` to return correct 24h format
 */
function pad(number: number) {
	const preFix = number < 10 ? '0' : '';

	return `${preFix}${number}`;
}

function isAM(hours: number) {
	return hours < 12;
}
