// import {RegisterStateInterface} from '../../shared/types/registerState.interface';
import {createReducer, on} from '@ngrx/store';
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.action';
import {RegisterStateInterface} from '../shared/types/registerState.interface';
import {loginAction, loginFailureAction, loginSuccessAction} from './actions/login.action';
import {
  getCurrentUserAction,
  getCurrentUserActionFailure,
  getCurrentUserActionSuccess
} from './actions/getCurrentUser.action';
import {state} from '@angular/animations';
import {updateCurrentUserSuccessAction} from './actions/updateCurrentUser.action';

const initialState: RegisterStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  isLoading: false,
  validationErrors: null
};

export const authReducer = createReducer(
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
  ),

  on(
    loginAction,
    state => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    loginSuccessAction,
    (state, action): RegisterStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    loginFailureAction,
    (state, action): RegisterStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),


  on(
    getCurrentUserAction,
    state=> ({
        ...state,
        isLoading: true
    })
  ),
  on(
    getCurrentUserActionSuccess,
    (state, action): RegisterStateInterface => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.currentUser
      })
  ),
  on(
    getCurrentUserActionFailure,
    state => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })
  ),

  on(
    updateCurrentUserSuccessAction,
    (state, action): RegisterStateInterface => ({
      ...state,
      currentUser: action.currentUser
    })
  )
);
