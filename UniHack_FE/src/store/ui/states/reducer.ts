import produce from 'immer';

import initialState from './initialState';
import { ActionTypes, Actions, State } from './types';

export default (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.SET_UI_STATES: {
			const { focus = state.focus, filterBreakdown = state.filterBreakdown } = action.payload;

			return produce(state, draft => {
				draft.focus = focus;
				draft.filterBreakdown = filterBreakdown;
			});
		}

		case ActionTypes.ADD_MODAL: {
			const { modalId } = action.payload;

			return produce(state, draft => {
				draft.activeModals.push(modalId);
			});
		}

		case ActionTypes.REMOVE_MODAL: {
			const { modalId } = action.payload;

			return produce(state, draft => {
				draft.activeModals = draft.activeModals.filter(id => id !== modalId);
			});
		}

		case ActionTypes.SHOW_JADBIO_LOGIN: {
			const { show } = action.payload;

			return produce(state, draft => {
				draft.showJADBioLogIn = show;
			});
		}

		default: {
			return state;
		}
	}
};
