import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {createReducer, on} from '@ngrx/store';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from './actions/getTags.action';


export const initialState: PopularTagsStateInterface = {
  tags: null
}

// @ts-ignore
export const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state: PopularTagsStateInterface) => (
      {
        ...state,
      }
    )
  ),
  on(
    getPopularTagsSuccessAction,
    (state: PopularTagsStateInterface, action) :any => ({
      ...state,
      tags: action.tags,
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state: PopularTagsStateInterface) => (
      {
        ...state,
      }
    )
  )
)
