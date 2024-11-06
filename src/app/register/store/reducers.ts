import {RegisterStateInterface} from '../types/registerState.interface';
import {createReducer, on} from '@ngrx/store';
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.action';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

const initialState: RegisterStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
};

export const registerReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): RegisterStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null

    })
  ),
  on(
    registerSuccessAction,
    (state, action): RegisterStateInterface => ({
        ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state, action): RegisterStateInterface => ({
        ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);
