import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {createReducer, on} from '@ngrx/store';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from './actions/getTags.action';


export const initialState: PopularTagsStateInterface = {
  data: null,
  error: null,
  isLoading: false,
}

// @ts-ignore
export const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: true,
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      data: action.tags,
      isLoading: false,
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => (
      {
        ...state,
        isLoading: false,
      }
    )
  )
)
