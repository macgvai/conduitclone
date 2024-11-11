import {createSelector} from '@ngrx/store';
import {AppStateInterface} from '../shared/types/appState.interface';
import {RegisterStateInterface} from '../shared/types/registerState.interface';

export const selectRegister = (state: AppStateInterface) => state.auth;

export const isSubmittingSelector = createSelector(
  selectRegister,
  (state: RegisterStateInterface) => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
  selectRegister,
  (state: RegisterStateInterface) => state.validationErrors
);

export const isLoggedInSelector = createSelector(
  selectRegister,
  (state: RegisterStateInterface) => state.isLoggedIn
);
export const isAnonymousSelector = createSelector(
  selectRegister,
  (state: RegisterStateInterface) => state.isLoggedIn === false
);

export const currentUserSelector = createSelector(
  selectRegister,
  (state: RegisterStateInterface) => state.currentUser
);
