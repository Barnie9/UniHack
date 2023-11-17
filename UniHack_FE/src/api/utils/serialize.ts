type Input = { [key: string]: any };
type Params = { [key: string]: string | number };

export function serializeInput(input: Input | undefined) {
	if (!input) return undefined;

	const params: Params = {};
	Object.keys(input).forEach(key => {
		if (input[key] !== undefined) {
			if (Array.isArray(input[key])) {
				params[key] = input[key].join(',');
			} else {
				params[key] = input[key];
			}
		}
	});

	return params;
}
