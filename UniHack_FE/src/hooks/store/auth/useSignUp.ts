import { SignUpInput, Nullable } from 'api';
import { useDispatch, useSelector } from 'hooks';
import { signUp, ActionType, selectSignUpId } from 'store/auth';
import { useActivity } from '../utils';
import { OperationResult } from '../types';

export function useSignUp(): OperationResult<Nullable<string>, (input: SignUpInput) => void> {
	const dispatch = useDispatch();

	const data = useSelector(state => selectSignUpId(state.auth));
	const [{ loading, error }] = useActivity(ActionType.SIGN_UP);

	function handler(input: SignUpInput) {
		dispatch(signUp(input));
	}

	return [{ data, loading, error }, handler];
}
