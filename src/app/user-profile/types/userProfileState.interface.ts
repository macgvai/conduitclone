import {ProfileInterface} from '../../shared/types/profile.interface';

export interface UserProfileStateInterface {
  isLoading: boolean;
  error: string;
  data: ProfileInterface | null;
}
