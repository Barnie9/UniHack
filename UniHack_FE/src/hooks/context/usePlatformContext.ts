import invariant from 'invariant';
import { createContext, useContext } from 'react';

interface ContextValue {
	isDesktop: boolean;
	isTv: boolean;
}

export const PlatformContext = createContext<ContextValue>({ isDesktop: false, isTv: false });
export function usePlatformContext() {
	const context = useContext(PlatformContext);
	invariant(context, 'usePlatformContext must be used within a PlatformContext.Provider');
	return context;
}
