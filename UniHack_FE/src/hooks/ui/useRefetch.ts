import { useEffect, useState } from 'react';
import { Nullable } from 'types';

const DEFAULT_TIMEOUT = 15 * 60;

export function useRefetch(
	timeout?: Nullable<number>
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
	const [state, set] = useState(false);

	const t = timeout ?? DEFAULT_TIMEOUT;
	useEffect(() => {
		let id: ReturnType<typeof setTimeout>;

		if (!state) {
			id = setTimeout(() => {
				set(true);
			}, t * 1000);
		}

		return () => clearTimeout(id);
	}, [state, t]);

	return [state, set];
}
