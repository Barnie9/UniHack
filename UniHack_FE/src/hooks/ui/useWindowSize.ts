import { useState, useLayoutEffect, useEffect } from 'react';
import { useDebounce } from './useDebounce';

const events = new Set<() => void>();

export function useWindowSize(wait?: number) {
	const [size, setSize] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	});
	const [resizing, setResizing] = useState(false);
	const [finished, setFinished] = useState(true);

	useEffect(() => {
		if (!resizing) {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		}
	}, [resizing]);

	useEffect(() => {
		setFinished(true);
	}, [size]);

	const handleResize = useDebounce(() => {
		setResizing(false);
		setFinished(false);
	}, wait);

	useLayoutEffect(() => {
		function onResize() {
			setResizing(true);
			return events.forEach(fn => fn());
		}

		if (events.size === 0) {
			window.addEventListener('resize', onResize, true);
		}

		events.add(handleResize);

		return () => {
			events.delete(handleResize);

			if (events.size === 0) {
				window.removeEventListener('resize', onResize, true);
			}
		};
	}, []);

	return { ...size, resizing: resizing || !finished };
}
