import { createSelector } from 'reselect';
import { State } from './types';

export const selectFocusState = createSelector(
	(state: State) => state.focus,
	focus => focus
);

export const selectFilterBreakdownState = createSelector(
	(state: State) => state.filterBreakdown,
	filterBreakdown => filterBreakdown
);

export const selectActiveModals = createSelector(
	(state: State) => state.activeModals,
	activeModals => activeModals
);

export const selectShowJADBioLogin = createSelector(
	(state: State) => state.showJADBioLogIn,
	showJADBioLogIn => showJADBioLogIn
);
