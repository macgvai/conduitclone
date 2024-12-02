import {AppStateInterface} from '../../types/appState.interface';
import {createSelector} from '@ngrx/store';
import {PopularTagsStateInterface} from '../types/popularTagsState.interface';


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
