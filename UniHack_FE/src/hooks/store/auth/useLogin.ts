import { useCallback } from 'react';
import { Credentials } from 'api';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch, useSelector } from 'hooks/utils';
import { ActionType, login, selectSession, AuthSession } from 'store/auth';
import { Nullable } from 'types';

export function useLogin(): OperationResult<
	Nullable<AuthSession>,
	(creds: Credentials) => void
> {
	const dispatch = useDispatch();
	const [{ loading, error }] = useActivity(ActionType.LOGIN);
	const data = useSelector(state => selectSession(state.auth));

	const handler = useCallback(
		(creds: Credentials) => {
			dispatch(login(creds));
		},
		[dispatch]
	);

	return [{ loading, error, data }, handler];
}
