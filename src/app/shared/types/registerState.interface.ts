import {CurrentUserInterface} from './currentUser.interface';
import {BackendErrorsInterface} from './backendErrors.interface';

export interface RegisterStateInterface {
  isSubmitting: boolean,
  currentUser: CurrentUserInterface | null,
  isLoggedIn: boolean | null,
  isLoading: boolean,
  validationErrors: BackendErrorsInterface | null
}
