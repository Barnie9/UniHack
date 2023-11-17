import { useEffect, useState } from 'react';

export function useDeferLoading(loading: boolean, delay = 250) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (loading) {
			const id = setTimeout(() => setIsLoading(true), delay);
			return () => clearTimeout(id);
		} else {
			setIsLoading(false);
		}
	}, [loading]);

	return isLoading;
}
