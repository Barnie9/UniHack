import { BooleanMap } from 'types';

export function buildBooleanMap(keys: string[], initialValue: boolean) {
	const map: BooleanMap = {};
	keys.forEach(key => (map[key] = initialValue));
	return map;
}
