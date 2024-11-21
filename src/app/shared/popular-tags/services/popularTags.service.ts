import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GetPopularTagsInterface} from '../types/getPopularTags.interface';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable(
  {providedIn: 'root'}
)

export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<GetPopularTagsInterface> {
    const fullUrl = environment.apiUrl + '/tags';
    return this.http.get<GetPopularTagsInterface>(fullUrl);
  }
}
