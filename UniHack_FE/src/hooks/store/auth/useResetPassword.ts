import { useCallback } from 'react';
import { ResetPasswordInput } from 'api';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch } from 'hooks/utils';
import { ActionType, resetPassword } from 'store/auth';

export function useResetPassword(): OperationResult<null, (input: ResetPasswordInput) => void> {
	const dispatch = useDispatch();
	const [{ loading, error }] = useActivity(ActionType.RESET_PASSWORD);

	const handler = useCallback(
		(input: ResetPasswordInput) => {
			dispatch(resetPassword(input));
		},
		[dispatch]
	);

	return [{ loading, error, data: null }, handler];
}
