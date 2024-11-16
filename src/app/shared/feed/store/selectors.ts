import { AppStateInterface } from '../../types/appState.interface';
import { createSelector } from '@ngrx/store';
import { FeedStateInterface } from '../types/feedState.interface';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

export const selectFeed = (state: AppStateInterface) => state.feed;

export const isLoadingSelector = createSelector(
  selectFeed,
  (feedState: FeedStateInterface) => feedState.isLoading
);

export const errorSelector = createSelector(
  selectFeed,
  (feedState: FeedStateInterface) => feedState.error
);
export const feedSelector = createSelector(
  selectFeed,
  (feedState: FeedStateInterface): GetFeedResponseInterface => feedState.data
);
