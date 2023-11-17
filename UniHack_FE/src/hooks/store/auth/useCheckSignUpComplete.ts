import { useDispatch, useSelector } from 'hooks';
import {  ActionType, selectSignUpState } from 'store/auth';
import { useActivity } from '../utils';
import { OperationResult } from '../types';
 type Nullable<T> = T | null;
// pendingSignUp,
export function useCheckSignUpComplete(): OperationResult<Nullable<boolean>, (id: string) => void> {
	const dispatch = useDispatch();

	const data = useSelector(state => selectSignUpState(state.auth));
	const [{ loading, error }] = useActivity(ActionType.PENDING_SIGN_UP);

	function handler(id: string) {
		// dispatch(pendingSignUp(id));
	}

	return [{ data, loading, error }, handler];
}
