import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError} from 'rxjs/operators';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/getArticle.action';


@Injectable()
export class GetArticleEffect {

  getArticleEffect = createEffect(() => this.actions$.pipe(
      ofType(getArticleAction),
      exhaustMap(({slug}) => this.sharedArticleService.getArticles(slug)
        .pipe(
          map(article => (getArticleSuccessAction({article}))),
          catchError(() => of(getArticleFailureAction()))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {
  }
}
