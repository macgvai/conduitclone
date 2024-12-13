import {createReducer, on} from '@ngrx/store';
import {CreateArticleStateInterface} from '../types/createArticleState.interface';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from './actions/createArticle.action';
import {routerNavigatedAction} from '@ngrx/router-store';
import {ArticleStateInterface} from '../../article/types/articleState.interface';

export const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null
}

export const createArticleReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    createArticleSuccessAction,
    (state, action): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    createArticleFailureAction,
    (state, action): CreateArticleStateInterface => (
      {
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      }
    )
  ),

  on(routerNavigatedAction, (): CreateArticleStateInterface => initialState)

)
