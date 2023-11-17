import { useState } from 'react';

import { useEffectOnce } from 'hooks';
import { isOnWindows } from 'helpers';
import { EventType } from 'types';

export const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState({
		scrollTop: 0,
		scrollLeft: 0
	});

	const isWindows = isOnWindows();

	function scrollHandler(event: any) {
		setScrollPosition({
			scrollTop: isWindows ? event.target.scrollTop : window.pageYOffset,
			scrollLeft: event.target.scrollLeft
		});
	}

	useEffectOnce(() => {
		if (isWindows) {
			document.body.addEventListener(EventType.Scroll, scrollHandler, {
				capture: false
			});

			return () => {
				document.body.removeEventListener(EventType.Scroll, scrollHandler, {
					capture: false
				});
			};
		} else {
			window &&
				window.addEventListener(EventType.Scroll, scrollHandler, {
					capture: false
				});

			return () => {
				window &&
					window.removeEventListener(EventType.Scroll, scrollHandler, {
						capture: false
					});
			};
		}
	});

	return {
		...scrollPosition
	};
};
