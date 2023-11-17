import { Action } from 'store/types';

export interface UiStatesInput {
	focus?: boolean;
	filterBreakdown?: boolean;
}

export interface State {
	focus: boolean;
	filterBreakdown: boolean;
	activeModals: string[];
	showJADBioLogIn: boolean;
}

export enum ActionTypes {
	SET_UI_STATES = 'ui/states/SET_UI_STATES',
	ADD_MODAL = 'ui/states/ADD_MODAL',
	REMOVE_MODAL = 'ui/states/REMOVE_MODAL',
	SHOW_JADBIO_LOGIN = 'ui/states/SHOW_JADBIO_LOGIN'
}

export type SetUiStatesAction = Action<ActionTypes.SET_UI_STATES, UiStatesInput>;

export type AddRemoveModalAction = Action<
	ActionTypes.ADD_MODAL | ActionTypes.REMOVE_MODAL,
	{ modalId: string }
>;

export type ShowJADBioLogInAction = Action<ActionTypes.SHOW_JADBIO_LOGIN, { show: boolean }>;

export type Actions = SetUiStatesAction | AddRemoveModalAction | ShowJADBioLogInAction;
