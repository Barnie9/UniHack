import { decodeURIComponentSafe } from './generic';

export function encodeString(string: string): string {
	string = string.trim();
	string = encodeURIComponent(string);

	return string;
}

export function decodeString(string: string): string {
	string = decodeURIComponentSafe(string);
	string = string.trim();

	return string;
}

export function encodeStringArray(array: string[]): string[] {
	return array.map(string => encodeString(string)).filter(string => !!string);
}

export function decodeStringArray(array: string[]): string[] {
	return array.map(string => decodeString(string)).filter(string => !!string);
}

export function splitString(string: string) {
	return string
		.toLowerCase()
		.split(/[\s,]+/)
		.map(value => value.trim())
		.filter(value => !!value);
}

export function hasMatches({
	searchTerm,
	keywords
}: {
	searchTerm: string;
	keywords: string[];
}): boolean {
	let matches = false;

	const splitSearchTerm = splitString(searchTerm);
	const parsedKeywords = keywords
		.map(keyword => keyword.toLowerCase().trim())
		.filter(keyword => !!keyword);

	termFor: for (const term of splitSearchTerm) {
		for (const keyword of parsedKeywords) {
			if (keyword.indexOf(term) !== -1) {
				matches = true;
				break termFor;
			}
		}
	}

	return matches;
}
