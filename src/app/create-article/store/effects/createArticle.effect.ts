import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError, tap} from 'rxjs/operators';
import {CreateArticleService} from '../../services/create-article.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from '../actions/createArticle.action';
import {Router} from '@angular/router';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class CreateArticleEffect {

  createArticle$ = createEffect(
    () => this.actions$.pipe(
      ofType(createArticleAction),
      exhaustMap(({articleInput}) => this.createArticleService.createArticle(articleInput)
        .pipe(
          map((article: ArticleInterface) => createArticleSuccessAction({article})),
          catchError(
            (errorResponse: HttpErrorResponse) => of(createArticleFailureAction({errors: errorResponse.error.errors}))
          )
        )
      )
    )
  );

  redirectAfterCreate$ = createEffect(
    () => this.actions$.pipe(
      ofType(createArticleSuccessAction),
      tap(({article}) => {
        this.router.navigate(['/article', article.slug]);
      })
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {
  }
}

