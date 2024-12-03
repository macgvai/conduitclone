import {ArticleStateInterface} from '../types/articleState.interface';
import {createReducer, on} from '@ngrx/store';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/getArticle.action';

export const initialState: ArticleStateInterface = {
  data: null,
  error: null,
  isLoading: false,
}

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
);
