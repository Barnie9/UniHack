import { useEffect, useState } from 'react';

export function useDelayedUnmount(condition: boolean, delay = 500) {
	const [rendered, setRendered] = useState(condition);

	useEffect(() => {
		if (!condition && rendered) {
			const id = setTimeout(() => setRendered(false), delay);
			return () => clearTimeout(id);
		} else {
			setRendered(condition);
		}
	}, [condition]);

	return rendered;
}
