import {createAction, props} from '@ngrx/store';
import {ActionType} from '../actionType';
import {GetPopularTagsInterface} from '../../types/getPopularTags.interface';
import {PopularTagsInterface} from '../../types/popularTags.interface';

export const getPopularTagsAction = createAction(
    ActionType.GET_POPULAR_TAGS
)

export const getPopularTagsSuccessAction = createAction(
    ActionType.GET_POPULAR_TAGS_SUCCESS,
    props<{tags: PopularTagsInterface}>()
)

export const getPopularTagsFailureAction = createAction(
    ActionType.GET_POPULAR_TAGS_FAILURE
)
