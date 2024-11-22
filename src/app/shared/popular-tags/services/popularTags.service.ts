import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import { GetPopularTagsResponseInterface} from '../types/getPopularResponseTags.interface';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PopularTagType} from '../../types/popularTagType';

@Injectable(
  {providedIn: 'root'}
)

export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const fullUrl = environment.apiUrl + '/tags';
    return this.http.get<GetPopularTagsResponseInterface>(fullUrl).pipe(map(response => response.tags));
  }
}
