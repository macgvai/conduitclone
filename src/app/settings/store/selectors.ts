import {AppStateInterface} from '../../shared/types/appState.interface';
import {createSelector} from '@ngrx/store';
import {SettingsStateInterface} from './types/settingsState.interface';

export const selectFeature = (state: AppStateInterface) => state.settings;

export const isSubmittingSelector = createSelector(
  selectFeature,
  (state: SettingsStateInterface) => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
  selectFeature,
  (state: SettingsStateInterface) => state.validationErrors
);
