import { ActionPayload } from 'store/types';

import {
	ActionTypes,
	SetUiStatesAction,
	AddRemoveModalAction,
	ShowJADBioLogInAction
} from './types';

export const setUiStates = (payload: ActionPayload<SetUiStatesAction>): SetUiStatesAction => ({
	type: ActionTypes.SET_UI_STATES,
	payload
});

export const addModal = (payload: ActionPayload<AddRemoveModalAction>): AddRemoveModalAction => ({
	type: ActionTypes.ADD_MODAL,
	payload
});

export const removeModal = (
	payload: ActionPayload<AddRemoveModalAction>
): AddRemoveModalAction => ({
	type: ActionTypes.REMOVE_MODAL,
	payload
});

export const showJADBioLogin = (
	payload: ActionPayload<ShowJADBioLogInAction>
): ShowJADBioLogInAction => ({
	type: ActionTypes.SHOW_JADBIO_LOGIN,
	payload
});
