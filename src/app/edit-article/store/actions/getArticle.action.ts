import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';

export const getArticleAction = createAction(
  ActionTypes.GET_ARTICLE,
  props<{slug: string}>()
)

export const getArticleSuccessAction = createAction(
  ActionTypes.GET_ARTICLE_SUCCESS,
  props<{article: ArticleInterface}>()
)

export const getArticleFailureAction = createAction(
  ActionTypes.GET_ARTICLE_FAILURE,
)
