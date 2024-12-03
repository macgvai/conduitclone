import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {GetArticlesResponseInterface} from '../types/getArticlesResponse.interface';
import {map, Observable} from 'rxjs';
import {ArticleInterface} from '../types/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  http = inject(HttpClient);

  getArticles(slug: string): Observable<ArticleInterface>  {
    const fullUrl = environment.apiUrl + '/articles/' + slug;
    console.log(fullUrl)
    return this.http.get<GetArticlesResponseInterface>(fullUrl).pipe(map(response => response.article));
  }
}
