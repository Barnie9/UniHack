import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(window.matchMedia(query).matches);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		let active = true;

		const listener = () => {
			if (!active) {
				return;
			}

			if (mediaQueryList.matches) {
				setMatches(true);
			} else {
				setMatches(false);
			}
		};

		mediaQueryList.addEventListener('change', listener);
		setMatches(mediaQueryList.matches);

		return () => {
			active = false;
			mediaQueryList.removeEventListener('change', listener);
		};
	}, [query]);

	return matches;
}
