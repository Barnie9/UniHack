import { useCallback } from 'react';
import { UpdateUserInput, User } from 'api';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch, useSelector } from 'hooks/utils';
import { ActionType, selectUser, updateUser } from 'store/data/account';

export function useUpdateUser(): OperationResult<User, (input: UpdateUserInput) => void> {
	const dispatch = useDispatch();
	const [{ loading, error }] = useActivity(ActionType.UPDATE_USER);
	const data = useSelector(state => selectUser(state.data.account));

	const handler = useCallback(
		(input: UpdateUserInput) => {
			dispatch(updateUser(input));
		},
		[dispatch]
	);

	return [{ loading, loaded: !!data, error, data }, handler];
}
