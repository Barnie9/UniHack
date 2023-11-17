import { createSelector } from 'reselect';
import { State } from './types';

export const selectAccountMetadata = createSelector(
	(state: State) => state.metadata,
	metadata => metadata
);

// export const selectAccountSettings = createSelector(
// 	(state: State) => state.settings,
// 	settings => settings
// );

export const selectUser = createSelector(
	(state: State) => state.user!,
	user => user
);

export const selectUsers = createSelector(
	(state: State) => state.usersIds,
	(users) => users
  );
  
  export const selectOne = createSelector(
	(state: State, id: number | undefined) =>
	  id !== undefined ? state.userById[id] : null,
	(user) => user
  );
  