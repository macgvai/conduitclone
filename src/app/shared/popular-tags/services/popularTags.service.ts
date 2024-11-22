import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {GetPopularTagsInterface} from '../types/getPopularTags.interface';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PopularTagsInterface} from '../types/popularTags.interface';

@Injectable(
  {providedIn: 'root'}
)

export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagsInterface> {
    const fullUrl = environment.apiUrl + '/tags';
    return this.http.get<GetPopularTagsInterface>(fullUrl).pipe(map(data => data.tags));
  }
}
