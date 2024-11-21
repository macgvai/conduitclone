import {createAction} from '@ngrx/store';
import {ActionType} from '../actionType';

export const getPopularTagsAction = createAction(
    ActionType.GET_POPULAR_TAGS
)

export const getPopularTagsSuccessAction = createAction(
    ActionType.GET_POPULAR_TAGS_SUCCESS
)

export const getPopularTagsFailureAction = createAction(
    ActionType.GET_POPULAR_TAGS_FAILURE
)
