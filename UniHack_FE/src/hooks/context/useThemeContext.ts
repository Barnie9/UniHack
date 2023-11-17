import invariant from 'invariant';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';

export function useThemeContext() {
	const theme = useContext(ThemeContext);
	invariant(theme, 'useThemeContext must be used within a ThemeContext.Provider');
	return theme;
}
