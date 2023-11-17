import { useCallback } from 'react';

import { OperationResult } from 'hooks/store/types';
import { useDispatch, useSelector } from 'hooks/utils';
import { clearError, endActivity, selectAllErrors, ActivityError } from 'store/ui/activities';

const BLACKLISTED_TYPES: { [key: string]: boolean } = {};

export function useAlertsErrors(): OperationResult<ActivityError[], (uuid: string) => void> {
	const dispatch = useDispatch();
	const errors = useSelector(state => selectAllErrors(state.ui.activities));
	const data = errors.filter(err => !BLACKLISTED_TYPES[err.type]);

	const handler = useCallback(
		(uuid: string) => {
			dispatch(clearError({ uuid }));
			dispatch(endActivity({ uuid }));
		},
		[dispatch]
	);

	return [{ loading: false, error: null, data }, handler];
}
