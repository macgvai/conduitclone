import {inject, Injectable} from '@angular/core';
import {ArticleInputInterface} from '../../shared/types/articleInput.interface';
import {map, Observable} from 'rxjs';
import {ArticleInterface} from '../../shared/types/article.interface';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SaveArticleResponseInterface} from '../../shared/types/saveArticleResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class EditArticleService {
  http = inject(HttpClient)

  updateArticle(slug: string, articleInput: ArticleInputInterface): Observable<ArticleInterface> {
    debugger
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http.put<SaveArticleResponseInterface>(fullUrl, {article: articleInput}).pipe(
      map((response: SaveArticleResponseInterface) => response.article)
    );
  }
}
