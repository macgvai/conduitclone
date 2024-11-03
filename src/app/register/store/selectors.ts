import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { RegisterStateInterface } from '../types/registerState.interface';

export const selectRegister = (state: AppStateInterface) => state.register;

export const isSubmittingSelector = createSelector(
  selectRegister,
  (state: RegisterStateInterface) => state.isSubmitting
);
