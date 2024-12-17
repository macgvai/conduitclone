import {EditArticleState} from '../types/editArticleState.interface';
import {createReducer, on} from '@ngrx/store';
import {routerNavigatedAction} from '@ngrx/router-store';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from './actions/editArticle.action';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/getArticle.action';

export const initialState: EditArticleState = {
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
  article: null,
};


export const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state): EditArticleState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state, action): EditArticleState => ({
      ...state,
      isSubmitting: false,
      article: action.article,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error
    })
  ),

  on(
    getArticleAction,
    (state): EditArticleState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleState => ({
      ...state,
      isLoading: false,
      article: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleState => ({
      ...state,
      isLoading: false,
    })
  ),

  on(routerNavigatedAction, (): EditArticleState => initialState)
);
