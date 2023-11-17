import { useEffect } from 'react';

type CustomEventType<Payload> = Event & {
	detail?: Payload;
};

type CustomEventFactory<Payload> = {
	dispatch: (payload: Payload) => void;
	registerCallback: (callback: (payload: Payload) => void) => void;
	addListener: () => void;
	removeListener: () => void;
};

export function customEventFactory<Payload = never>(
	eventName: string
): CustomEventFactory<Payload> {
	let internalCallback: ((payload: Payload) => void) | undefined;

	function dispatch(payload: Payload) {
		document.dispatchEvent(
			new CustomEvent<Payload>(eventName, {
				detail: payload
			})
		);
	}

	function registerCallback(callback: (payload: Payload) => void) {
		internalCallback = callback;
	}

	function addListener() {
		if (internalCallback) document.addEventListener(eventName, handleCallback);
	}

	function removeListener() {
		if (internalCallback) document.removeEventListener(eventName, handleCallback);
	}

	function handleCallback(e: CustomEventType<Payload>) {
		if (e.detail !== undefined && internalCallback) internalCallback(e.detail);
	}

	return { dispatch, registerCallback, addListener, removeListener };
}

export function useCustomEventListener<Payload>(
	event: () => CustomEventFactory<Payload>,
	params: {
		onListen: (payload: Payload) => void;
		onStartListening?: () => void;
		listen?: boolean;
	},
	deps?: React.DependencyList
) {
	const { onListen, onStartListening, listen } = params;

	function getDepList() {
		const depList: any[] = [];

		if (deps !== undefined) {
			depList.push(...deps);

			if (listen !== undefined) depList.push(listen);
		}

		if (depList.length === 0) return;

		return depList;
	}

	// FIELD CHANGE LISTENER - TRIGGER VALIDATION CHECKS ON CHANGE
	useEffect(() => {
		if (listen !== undefined && !listen) return;

		if (onStartListening) onStartListening();

		const { registerCallback, addListener, removeListener } = event();

		// MUST BE CALLED BEFORE `addListener()`, `removeListener()`
		registerCallback(onListen);

		addListener();

		return () => removeListener();
	}, getDepList());
}
