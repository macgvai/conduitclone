import {ArticleInterface} from '../../shared/types/article.interface';

export interface ArticleStateInterface {
  data: ArticleInterface | null,
  error: string | null,
  isLoading: boolean,
}
