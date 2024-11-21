import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {createReducer, on} from '@ngrx/store';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from './actions/getTags.action';

export const initialState: PopularTagsStateInterface = {
  tags: null
}

export const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state: PopularTagsStateInterface) => (
      {
        ...state,
        tags: ['aaaa']
      }
    )
  ),
  on(
    getPopularTagsSuccessAction,
    (state: PopularTagsStateInterface) => (
      {
        ...state,
        tags: ['aaaa']
      }
    )
  ),
  on(
    getPopularTagsFailureAction,
    (state: PopularTagsStateInterface) => (
      {
        ...state,
        tags: ['aaaa']
      }
    )
  )
)
