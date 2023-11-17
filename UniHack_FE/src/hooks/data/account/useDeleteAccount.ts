import { useCallback } from 'react';
import { DeleteAccountInput } from 'api';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch } from 'hooks/utils';
import { ActionType, deleteAccount } from 'store/data/account';

export function useDeleteAccount(): OperationResult<null, (input: DeleteAccountInput) => void> {
	const dispatch = useDispatch();
	const [{ loading, error }] = useActivity(ActionType.DELETE_ACCOUNT);

	const handler = useCallback(
		(input: DeleteAccountInput) => {
			dispatch(deleteAccount(input));
		},
		[dispatch]
	);

	return [{ error, loading, data: null }, handler];
}
