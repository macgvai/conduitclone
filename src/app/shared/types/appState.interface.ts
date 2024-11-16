import { FeedStateInterface } from '../feed/types/feedState.interface';
import { RegisterStateInterface } from './registerState.interface';

export interface AppStateInterface {
  auth: RegisterStateInterface;
  feed: FeedStateInterface;
}
