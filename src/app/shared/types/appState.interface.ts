import {FeedStateInterface} from '../feed/types/feedState.interface';
import {RegisterStateInterface} from './registerState.interface';
import {PopularTagsStateInterface} from '../popular-tags/types/popularTagsState.interface';
import {ArticleStateInterface} from '../../article/types/articleState.interface';
import {CreateArticleStateInterface} from '../../create-article/types/createArticleState.interface';

export interface AppStateInterface {
  auth: RegisterStateInterface,
  feed: FeedStateInterface,
  tags: PopularTagsStateInterface,
  article: ArticleStateInterface,
  createArticle: CreateArticleStateInterface,
}
