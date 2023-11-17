import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { factory } from 'api/factory';

// import { EnvVariables } from 'env';
import reducer from './root';
import { ThunkDispatch } from './types';

export const api = factory();

const configureStore = () => {
	const middleware =
		 composeWithDevTools(applyMiddleware<ThunkDispatch>(thunk.withExtraArgument({ api })))
	const store = createStore(reducer, middleware);

	return store;
};

export const store = configureStore();
