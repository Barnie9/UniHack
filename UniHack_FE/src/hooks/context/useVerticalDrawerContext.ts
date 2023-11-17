import invariant from 'invariant';
import { createContext, useContext } from 'react';

interface ContextValue {
	open: boolean;
	closeDrawer: (id: string | string[]) => void;
	openDrawer: (id: string) => void;
	toggleDrawer: (id: string) => void;
}

export const VerticalDrawerContext = createContext<ContextValue>({
	open: false,
	closeDrawer: () => null,
	openDrawer: () => null,
	toggleDrawer: () => null
});
export function useVerticalDrawerContext() {
	const context = useContext(VerticalDrawerContext);
	invariant(context, 'useDrawerContext must be used within a DrawerContext.Provider');
	return context;
}
