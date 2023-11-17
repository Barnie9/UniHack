import { useCallback } from 'react';
import { User } from 'api';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch, useSelector } from 'hooks/utils';
import { ActionType, getUser, selectUser } from 'store/data/account';
import { Nullable } from 'types';

export function useUser(): OperationResult<Nullable<User>> {
	const dispatch = useDispatch();
	const [{ loading, error }] = useActivity(ActionType.GET_USER);
	const data = useSelector(state => selectUser(state.data.account));

	const handler = useCallback(() => {
		dispatch(getUser());
	}, [dispatch]);

	return [{ loading, loaded: !!data, error, data }, handler];
}
