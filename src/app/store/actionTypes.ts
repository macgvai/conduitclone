export enum ActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register success',
  REGISTER_FAILURE = '[Auth] Register failure',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  GET_CURRENT_USER = '[Auth] Get Current User',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get Current User success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get Current User failure',

  UPDATED_CURRENT_USER = '[Auth] Updated Current User',
  UPDATED_CURRENT_USER_SUCCESS = '[Auth] Updated Current User success',
  UPDATED_CURRENT_USER_FAILURE = '[Auth] Updated Current User failure',

  LOGOUT = '[Auth] Logout',
}
