import {PopularTagType} from '../../types/popularTagType';

export interface PopularTagsStateInterface {
  data: PopularTagType[] | null
  error: string | null
  isLoading: boolean
}
