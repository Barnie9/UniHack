import { createContext, useContext } from 'react';

export interface SetAlertProps {
	message: string;
	timeout?: number;
}

interface AlertsContext {
	setNotification: (props: SetAlertProps) => void;
	setError: (props: SetAlertProps) => void;
}

export const AlertsContext = createContext<AlertsContext>({
	setNotification: () => null,
	setError: () => null
});

export function useAlerts() {
	return useContext(AlertsContext);
}
