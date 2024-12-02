import {AppStateInterface} from '../../shared/types/appState.interface';
import {createSelector} from '@ngrx/store';
import {ArticleStateInterface} from '../types/articleState.interface';
import {PopularTagsStateInterface} from '../../shared/popular-tags/types/popularTagsState.interface';
import {selectPopularTags} from '../../shared/popular-tags/store/selectors';

export const selectArticle = (state: AppStateInterface) => state.article;

export const getArticleSelector = createSelector(
  selectArticle,
  (state: ArticleStateInterface) => state.data
)
export const isLoadingArticleSelector = createSelector(
  selectArticle,
  (state: ArticleStateInterface) => state.isLoading
)

export const errorSelector = createSelector(
  selectArticle,
  (state: ArticleStateInterface) => state.error
)
