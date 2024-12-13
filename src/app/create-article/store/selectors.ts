import {AppStateInterface} from '../../shared/types/appState.interface';
import {createSelector} from '@ngrx/store';
import {CreateArticleStateInterface} from '../types/createArticleState.interface';

export const createArticleFeatureSelector = (state: AppStateInterface) => state.createArticle;

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (state: CreateArticleStateInterface) => state.isSubmitting
);

export const createArticleErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (state: CreateArticleStateInterface) => state.validationErrors
);
