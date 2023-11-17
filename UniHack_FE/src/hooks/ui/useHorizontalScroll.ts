import { useEffect, useState, useCallback } from 'react';

import { EventType } from 'types';

interface WheelEventInterface extends WheelEvent {
	wheelDeltaY: number;
}

type Target = Element | HTMLElement | HTMLDivElement | HTMLTableElement;

export function useHorizontalScroll() {
	const [target, setTarget] = useState<Target | null>(null);

	const handleRef = useCallback((refTarget: Target | null) => setTarget(refTarget), []);

	useEffect(() => {
		if (target === null) return;

		target.addEventListener(
			EventType.Wheel,
			event => {
				const hasTrackPad = detectTrackPad(event as WheelEventInterface);

				if (!hasTrackPad) handleReverseScroll(event as WheelEventInterface, target);
			},
			{ passive: false }
		);

		return () =>
			target.removeEventListener(EventType.Wheel, event =>
				handleReverseScroll(event as WheelEventInterface, target)
			);
	}, [target]);

	function detectTrackPad(event: WheelEventInterface) {
		const { deltaY, deltaMode, wheelDeltaY } = event;

		const absoluteDelta = Math.abs(deltaMode);

		let hasTrackPad = false;

		if (wheelDeltaY) {
			if (
				wheelDeltaY === deltaY * -3 ||
				wheelDeltaY === deltaY * -3 + 1 ||
				wheelDeltaY === deltaY * -3 - 1
			) {
				hasTrackPad = true;
			}
		} else if (absoluteDelta === 0 || absoluteDelta === 1) {
			hasTrackPad = true;
		}

		return hasTrackPad;
	}

	function handleReverseScroll(event: WheelEventInterface, target: Target) {
		const { deltaY } = event;
		const { clientWidth, scrollWidth, scrollLeft } = target;

		const scrollExists = scrollWidth !== clientWidth;

		if (scrollExists) {
			event.preventDefault();

			const toLeft = deltaY < 0 && scrollLeft > 0;
			const toRight = deltaY > 0 && scrollLeft < scrollWidth - clientWidth;

			if (toLeft || toRight) target.scrollLeft += deltaY;
		}
	}

	return { handleRef };
}
