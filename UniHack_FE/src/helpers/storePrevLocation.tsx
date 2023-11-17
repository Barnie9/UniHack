import { useEffect } from 'react';
import { usePrevious } from 'hooks';
import { useLocation } from 'react-router';

import { StorageKeys } from 'types';

export function StorePrevLocation() {
	const { pathname } = useLocation();

	const prevPathname = usePrevious(pathname);
	useEffect(() => {
		if (prevPathname) localStorage.setItem(StorageKeys.PrevPathname, prevPathname);
	}, [pathname]);

	return null;
}
