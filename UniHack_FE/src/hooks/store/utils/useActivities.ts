import { useEffect, useState } from 'react';

import { useSelector } from 'hooks/utils';
import { ActivityResult } from 'hooks/store/types';
import { ActivityError, selectActivities, selectErrorsDetails } from 'store/ui/activities';
import { Nullable } from 'types';

export function useActivities(types: string[]): ActivityResult {
	const [error, setError] = useState<Nullable<ActivityError>>(null);
	const loading = useSelector(state => selectActivities(state.ui.activities, types));
	const data = useSelector(state => selectErrorsDetails(state.ui.activities, types));

	useEffect(() => {
		if (data && !error) {
			setError(data);
		}

		if (!data && error) {
			setError(null);
		}
	}, [data]);

	function reset() {
		setError(null);
	}

	return [{ loading, error }, reset];
}
