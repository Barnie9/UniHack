import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';

import { PlatformContext } from 'hooks';
import { RouteParams } from 'types';

interface Props {
	children: React.ReactElement;
}

export function Platform({ children }: Props) {
	const [isDesktop, setIsDesktop] = useState(false);
	const [isTv, setIsTv] = useState(false);
	const match = useRouteMatch<RouteParams>('/tv');

	useEffect(() => {
		setIsTv(!!match || navigator.userAgent.includes('TV'));
	}, [match, navigator.userAgent]);

	useEffect(() => {
		setIsDesktop(!isTouchDevice());
	}, [navigator.userAgent]);

	function isTouchDevice() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	}

	return (
		<PlatformContext.Provider value={{ isDesktop, isTv }}>{children}</PlatformContext.Provider>
	);
}
