import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../../actionTypes';
import {LoginRequestInterface} from '../../types/loginRequest.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
)
