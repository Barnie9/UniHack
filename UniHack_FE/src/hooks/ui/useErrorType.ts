import { useState, useEffect } from 'react';
import { Nullable } from 'types';
import { ActivityError } from 'store/ui/activities';

export enum ErrorType {
	Warning,
	Critical
}

export function useErrorType(error: Nullable<ActivityError>) {
	const [errorType, setErrorType] = useState<ErrorType | null>(null);

	useEffect(() => {
		if (String(error?.status)[0] === '4') {
			setErrorType(ErrorType.Critical);
		}
		if (String(error?.status)[0] === '5') {
			setErrorType(ErrorType.Warning);
		}
	}, [error]);

	return [{ errorType: errorType }];
}
