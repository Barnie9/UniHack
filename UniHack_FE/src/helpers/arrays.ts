export const arrayUtils = {
	move<T>(arr: T[], oldIndex: number, newIndex: number) {
		const newArray = [...arr]; // shallow copy
		newArray.splice(newIndex, 0, newArray.splice(oldIndex, 1)[0]);
		return newArray;
	},
	insert<T>(arr: T[], index: number, newItem: T) {
		const newArray = [...arr.slice(0, index), newItem, ...arr.slice(index)];
		return newArray;
	},
	insertMany<T>(arr: T[], index: number, newItem: T[]) {
		const newArray = [...arr.slice(0, index), ...newItem, ...arr.slice(index)];
		return newArray;
	},
	remove<T>(arr: T[], index: number) {
		const newArray = [...arr]; // shallow copy
		newArray.splice(index, 1);
		return newArray;
	},
	/**
	 * Adds the item in the array if it doesn't exists.
	 * Substracts the item from the array if it exists.
	 * Returns the new list
	 */
	addOrSubstract<T>(arr: T[], item: T) {
		let newArray: T[] = [];

		const isItemInsideArray = arr.includes(item);

		if (isItemInsideArray) {
			newArray = arr.filter(v => v !== item);
		} else {
			newArray.push(...arr, item);
		}

		return newArray;
	}
};

export function truncateList<T>(list: T[], threshold: number) {
	let truncated = list;
	let rest: T[] = [];

	const shouldTruncate = list.length > threshold;

	if (shouldTruncate) {
		truncated = list.slice(0, threshold);
		rest = list.slice(threshold, list.length);
	}

	return {
		original: list,
		truncated,
		rest
	};
}
