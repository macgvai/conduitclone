import {createAction, props} from '@ngrx/store';
import {ActionType} from '../actionType';
import {PopularTagType} from '../../../types/popularTagType';

export const getPopularTagsAction = createAction(
    ActionType.GET_POPULAR_TAGS
)

export const getPopularTagsSuccessAction = createAction(
    ActionType.GET_POPULAR_TAGS_SUCCESS,
    props<{tags: PopularTagType[]}>()
)

export const getPopularTagsFailureAction = createAction(
    ActionType.GET_POPULAR_TAGS_FAILURE
)
