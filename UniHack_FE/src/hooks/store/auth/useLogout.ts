import { useCallback } from 'react';

import { useDispatch } from 'hooks/utils';
import { logout } from 'store/auth';

export function useLogout() {
	const dispatch = useDispatch();

	const handler = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	return handler;
}
