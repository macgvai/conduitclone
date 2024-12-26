import {AppStateInterface} from '../../shared/types/appState.interface';
import {createSelector} from '@ngrx/store';
import {UserProfileStateInterface} from '../types/userProfileState.interface';

export const userProfileFeature = (state: AppStateInterface) => state.userProfile;

export const isLoadingSelector = createSelector(
  userProfileFeature,
  (state: UserProfileStateInterface) => state.isLoading
);
export const userProfileSelector = createSelector(
  userProfileFeature,
  (state: UserProfileStateInterface) => state.data
);

export const userProfileErrorSelector = createSelector(
  userProfileFeature,
  (state: UserProfileStateInterface) => state.error
);
