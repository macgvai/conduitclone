import { FeedStateInterface } from '../feed/types/feedState.interface';
import { RegisterStateInterface } from './registerState.interface';
import {PopularTagsStateInterface} from '../popular-tags/types/popularTagsState.interface';

export interface AppStateInterface {
  auth: RegisterStateInterface;
  feed: FeedStateInterface;
  tags: PopularTagsStateInterface
}
