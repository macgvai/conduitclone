import { RegisterStateInterface } from '../types/registerState.interface';
import { createReducer, on } from '@ngrx/store';
import { registerAction } from './actions/register.action';

const initialState: RegisterStateInterface = {
  isSubmitting: false,
};

export const registerReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): RegisterStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  )
);
