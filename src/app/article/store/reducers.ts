import { ArticleStateInterface } from '../types/articleState.interface';
import { createReducer, on } from '@ngrx/store';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action';
import { routerNavigatedAction } from '@ngrx/router-store';

export const initialState: ArticleStateInterface = {
  data: null,
  error: null,
  isLoading: false,
};

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true,
      data: null,
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

  on(routerNavigatedAction, (): ArticleStateInterface => initialState)
);
