import {ActionTypes} from '../actionTypes';
import {createAction, props} from '@ngrx/store';
import {CurrentUserInputInterface} from '../../shared/types/currentUserInput.interface';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

export const updateCurrentUserAction = createAction(
  ActionTypes.UPDATED_CURRENT_USER,
  props<{currentUserInput: CurrentUserInputInterface}>()
)

export const updateCurrentUserSuccessAction = createAction(
  ActionTypes.UPDATED_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const updateCurrentUserFailureAction = createAction(
  ActionTypes.UPDATED_CURRENT_USER_FAILURE,
  props<{error: BackendErrorsInterface}>()
)
