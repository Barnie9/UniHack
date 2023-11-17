import fscreen from 'fscreen';
import { useCallback, useRef, useState } from 'react';
import { useEffectOnce } from 'hooks/utils';

interface Data<T> {
	active: boolean;
	node: React.RefObject<T>;
}

interface Actions {
	enter: () => Promise<void>;
	exit: () => Promise<void>;
}

export function useFullscreen<T extends HTMLElement>(): [Data<T>, Actions] {
	const node = useRef<T>(null);
	const [active, setActive] = useState(false);
	const [fallback, setFallback] = useState(false);

	useEffectOnce(() => {
		function handleChange() {
			setActive(fscreen.fullscreenElement === node.current);
		}

		fscreen.addEventListener('fullscreenchange', handleChange);
		return () => fscreen.removeEventListener('fullscreenchange', handleChange);
	});

	const enter = useCallback(
		async function() {
			try {
				if (fallback) {
					setActive(true);
				} else {
					if (fscreen.fullscreenElement) {
						await fscreen.exitFullscreen();
						if (node.current) {
							await fscreen.requestFullscreen(node.current);
						}
					} else if (node.current) {
						await fscreen.requestFullscreen(node.current);
					}
				}
			} catch (e) {
				if (!fallback) {
					setActive(true);
					setFallback(true);
				}
			}
		},
		[fallback]
	);

	const exit = useCallback(
		async function() {
			if (fallback) {
				setActive(false);
			} else {
				if (fscreen.fullscreenElement) {
					await fscreen.exitFullscreen();
				}
			}
		},
		[fallback]
	);

	return [
		{ active, node },
		{ enter, exit }
	];
}
