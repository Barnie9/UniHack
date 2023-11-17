import invariant from 'invariant';
import { createContext, useContext } from 'react';
import { GridProps } from 'types';

export const GridContext = createContext<GridProps | null>(null);
export function useGridContext() {
	const context = useContext(GridContext);
	invariant(context, 'useGridContext must be used within a GridContext.Provider');
	return context;
}
