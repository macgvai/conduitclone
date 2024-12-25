import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';
import {ArticleInterface} from '../../../types/article.interface';

export const addToFavoritesAction = createAction(
  ActionTypes.ADD_TO_FAVORiTES,
  props<{isFavorited: boolean, slug: string}>()
)
export const addToFavoritesSuccessAction = createAction(
  ActionTypes.ADD_TO_FAVORiTES_SUCCESS,
  props<{article: ArticleInterface}>()
)
export const addToFavoritesFailureAction = createAction(
  ActionTypes.ADD_TO_FAVORiTES_FAILURE,
)
