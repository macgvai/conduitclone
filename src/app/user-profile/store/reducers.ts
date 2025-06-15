import {UserProfileStateInterface} from '../types/userProfileState.interface';
import {createReducer, on} from '@ngrx/store';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from './actions/getUserProfile.action';
import {
  followProfileAction,
  followProfileFailureAction,
  followProfileSuccessAction
} from './actions/followProfile.action';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
}

export const userProfileReducer = createReducer(
  initialState,

  on(
    getUserProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),

  on(
    getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })
  ),

  on(
    getUserProfileFailureAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),

  on(
    followProfileAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),

  on(
    followProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })
  ),

  on(
    followProfileFailureAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
)
