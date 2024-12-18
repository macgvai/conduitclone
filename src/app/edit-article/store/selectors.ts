import {createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {EditArticleState} from '../types/editArticleState.interface';


export const editArticle = (state: AppStateInterface) => state.editArticle;

export const isSubmittingSelector = createSelector(
  editArticle,
  (state: EditArticleState) => state.isSubmitting
)

export const errorsSelector = createSelector(
  editArticle,
  (state: EditArticleState) => state.validationErrors
)

export const isLoadingSelector = createSelector(
  editArticle,
  (state: EditArticleState) => state.isLoading
)
export const articleSelector = createSelector(
  editArticle,
  (state: EditArticleState) => state.article
)
