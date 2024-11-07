import {createReducer, on} from '@ngrx/store';
import {loginAction} from './actions/login.action';
import {state} from '@angular/animations';

export const initialState: any = {
  isSubmitting: false,
  validationErrors: null
}

export const loginReducer = createReducer(
  initialState,
  on(
    loginAction,
    state => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  )
)
