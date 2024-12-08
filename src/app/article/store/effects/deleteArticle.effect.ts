import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { ArticleService } from '../../article.service';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
} from '../actions/getArticle.action';
import { Router } from '@angular/router';

@Injectable()
export class DeleteArticleEffect {
  deleteArticleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleAction),
      exhaustMap(({ slug }) =>
        this.articlesService.deleteArticle(slug).pipe(
          map(() => deleteArticleSuccessAction()),
          catchError(() => of(deleteArticleFailureAction()))
        )
      )
    )
  );

  toMainPage = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(deleteArticleSuccessAction),
        tap(() => this.route.navigate(['/']))
      );
    },
    { functional: true, dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private articlesService: ArticleService,
    private route: Router
  ) {}
}
