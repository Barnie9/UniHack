import { useCallback, useEffect, useState } from 'react';
import { throttle } from 'lodash';

import { EventType } from 'types';

const events = new Set<() => void>();

type Target = Element | HTMLElement | HTMLDivElement | HTMLTableElement;

export function useElementSize() {
	const [target, setTarget] = useState<Target | null>(null);
	const handleRef = useCallback((refTarget: Target | null) => setTarget(refTarget), []);
	const [size, setSize] = useState({
		width: 0,
		height: 0
	});

	const handleResize = throttle(() => {
		updateSize();
	}, 100);

	const updateSize = useCallback(() => {
		if (target === null) return;

		const { clientWidth, clientHeight } = target;
		setSize({ width: clientWidth, height: clientHeight });
	}, [target]);

	useEffect(() => {
		window.addEventListener(EventType.Resize, handleResize, true);

		handleResize();

		return () => {
			events.delete(handleResize);

			window.removeEventListener(EventType.Resize, handleResize, true);
		};
	}, [updateSize]);

	return { ...size, handleRef };
}
