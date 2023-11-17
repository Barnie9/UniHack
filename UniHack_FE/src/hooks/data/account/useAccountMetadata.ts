import { useCallback } from 'react';

import { OperationResult } from 'hooks/store/types';
import { useActivity } from 'hooks/store/utils';
import { useDispatch, useSelector } from 'hooks/utils';
import {
	ActionType,
	AccountMetadata,
	selectAccountMetadata,
	setAccountMetadata
} from 'store/data/account';

export function useAccountMetadata(): OperationResult<
	AccountMetadata,
	(input: Partial<AccountMetadata>) => void
> {
	const dispatch = useDispatch();
	const data = useSelector(state => selectAccountMetadata(state.data.account));
	const [{ loading, error }] = useActivity(ActionType.SET_ACCOUNT_METADATA);

	const handler = useCallback(
		(input: Partial<AccountMetadata>) => {
			dispatch(setAccountMetadata(input));
		},
		[dispatch]
	);

	return [{ loading, error, data }, handler];
}
