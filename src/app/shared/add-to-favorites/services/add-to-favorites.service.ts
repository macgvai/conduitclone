import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ArticleInterface} from '../../types/article.interface';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GetArticlesResponseInterface} from '../../types/getArticlesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AddToFavoritesService {
  http = inject(HttpClient);

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http.post(url, {}).pipe(map(this.getArticle))
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http.delete(url, {}).pipe(map(this.getArticle))
  }

  getUrl(slug: string): string  {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticlesResponseInterface): ArticleInterface {
    return response.article;
  }
}
