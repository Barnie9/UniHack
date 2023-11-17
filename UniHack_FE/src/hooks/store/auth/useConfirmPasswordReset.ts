import { useCallback } from 'react';
import { ConfirmPasswordResetInput } from 'api';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch, useSelector } from 'hooks/utils';
import { ActionType, confirmPasswordReset } from 'store/auth';
import { selectAccountMetadata } from 'store/data/account';

export function useConfirmPasswordReset(): OperationResult<
	boolean,
	(input: ConfirmPasswordResetInput) => void
> {
	const dispatch = useDispatch();
	const [{ loading, error }] = useActivity(ActionType.CONFIRM_PASSWORD_RESET);
	const data = useSelector(state => selectAccountMetadata(state.data.account));

	const handler = useCallback(
		(input: ConfirmPasswordResetInput) => {
			dispatch(confirmPasswordReset(input));
		},
		[dispatch]
	);

	return [{ loading, error, data: data.passwordChanged }, handler];
}
