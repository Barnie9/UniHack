import { memo } from 'react';

/**
 * NOTE:
 * IF `dependencyProps` array is provided => it will check the equality of the specified `prop names` in that array
 * OTHERWISE all props of the component will be tested for equality
 * @param Component
 * @param dependencyProps
 */
export function withMemo<T>(Component: React.FC<T>, dependencyProps?: Array<keyof T>) {
	return memo(Component, (prevProps, nextProps) => {
		let isEqual = true;

		const allPropsCount = Object.keys(prevProps).length;
		const allPropNames = Object.keys(prevProps).map(propName => propName as keyof T);

		const length = dependencyProps ? dependencyProps.length : allPropsCount;

		for (let i = 0; i < length; i++) {
			const propName = dependencyProps ? dependencyProps[i] : allPropNames[i];

			const prevProp = prevProps[propName];
			const nextProp = nextProps[propName];

			// compare equality between functions
			if (typeof prevProp === 'function') {
				if (prevProp !== nextProp) {
					isEqual = false;
					break;
				}
			}

			// compare equality between primitives, arrays, objects...
			if (JSON.stringify(prevProp) !== JSON.stringify(nextProp)) {
				isEqual = false;
				break;
			}
		}

		return isEqual;
	});
}

export function withMemoOnce<T>(Component: React.FC<T>) {
	return memo(Component, () => true);
}
