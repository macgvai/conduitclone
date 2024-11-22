import {AppStateInterface} from '../../types/appState.interface';
import {createAction, createSelector} from '@ngrx/store';
import {state} from '@angular/animations';
import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {RegisterStateInterface} from '../../types/registerState.interface';
import {selectRegister} from '../../../store/selectors';

export const selectPopularTags = (state: AppStateInterface) => state.tags;

export const selectTagsSelector = createSelector(
  selectPopularTags,
  (state: PopularTagsStateInterface) => state.data
)
export const isLoadingSelector = createSelector(
  selectPopularTags,
  (state: PopularTagsStateInterface) => state.isLoading
)
export const errorSelector = createSelector(
  selectPopularTags,
  (state: PopularTagsStateInterface) => state.error
)
