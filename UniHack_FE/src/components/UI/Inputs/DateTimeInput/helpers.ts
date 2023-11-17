import { format } from 'date-fns';

import { DATE_TIME_TIMEZONE_FORMAT } from 'consts';
import { debuggerLog } from 'helpers';

// SET TO `true` TO SEE THE LOGS
const DEBUGGER = false;
const log = debuggerLog(DEBUGGER);

export function convertToUTCTime(value: string) {
	log('convertToUTCTime()', { value });

	return new Date(value).toISOString().split('.')[0] + 'Z';
}

export function getDateTime(value: string) {
	log('getDateTime()', { value });

	const localTime = convertToLocalTime(value);

	const [date, time] = localTime.split(' ');

	return { date, time };
}

function convertToLocalTime(value: string) {
	log('convertToLocalTime()', { value });

	return format(new Date(value), DATE_TIME_TIMEZONE_FORMAT);
}
