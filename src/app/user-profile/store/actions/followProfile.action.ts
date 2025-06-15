import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';
import {ProfileInterface} from '../../../shared/types/profile.interface';

export const followProfileAction = createAction(
  ActionTypes.FOLLOW_PROFILE,
  props<{user: ProfileInterface}>()
)

export const followProfileSuccessAction = createAction(
  ActionTypes.FOLLOW_PROFILE_SUCCESS,
  props<{userProfile: ProfileInterface}>()
)

export const followProfileFailureAction = createAction(
  ActionTypes.FOLLOW_PROFILE_FAILURE
)
