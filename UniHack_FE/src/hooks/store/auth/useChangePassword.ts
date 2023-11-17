import { useCallback } from 'react';
import { ChangePasswordInput } from 'api';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch, useSelector } from 'hooks/utils';
import { ActionType, changePassword} from 'store/auth';
import { selectAccountMetadata } from 'store/data/account';

export function useChangePassword(): OperationResult<
	boolean,
	(input: ChangePasswordInput) => void
> {
	const dispatch = useDispatch();
	const [{ loading, error }] = useActivity(ActionType.CHANGE_PASSWORD);
	const data = useSelector(state => selectAccountMetadata(state.data.account));

	const handler = useCallback(
		(input: ChangePasswordInput) => {
			dispatch(changePassword(input));
		},
		[dispatch]
	);

	return [{ loading, error, data: data.passwordChanged }, handler];
}
