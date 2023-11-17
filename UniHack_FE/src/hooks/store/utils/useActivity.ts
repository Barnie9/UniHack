import { useEffect, useState } from 'react';

import { useSelector } from 'hooks/utils';
import { ActivityResult } from 'hooks/store/types';
import { ActivityError, selectActivity, selectErrorDetails } from 'store/ui/activities';
import { Nullable } from 'types';

interface ActivityConfigParams {
	payload?: any;
	reset?: boolean;
}

export function useActivity(type: string, params?: ActivityConfigParams): ActivityResult {
	const [error, setError] = useState<Nullable<ActivityError>>(null);
	const loading = useSelector(state => selectActivity(state.ui.activities, type));
	const data = useSelector(state => selectErrorDetails(state.ui.activities, type));

	useEffect(() => {
		if (data && !error) {
			setError(data);
		}

		if (!data && error && params?.reset) {
			setError(null);
		}
	}, [data]);

	function reset() {
		setError(null);
	}

	return [{ loading, error }, reset];
}
