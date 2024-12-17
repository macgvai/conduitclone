import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {EditArticleService} from '../../services/edit-article.service';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from '../actions/editArticle.action';

@Injectable()
export class UpdateArticleEffect {

  updateArticle$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateArticleAction),
      exhaustMap(({slug, articleInput}) => this.editArticleService.updateArticle(slug, articleInput)
        .pipe(
          map((article: ArticleInterface) => updateArticleSuccessAction({article})),
          catchError(
            (errorResponse: HttpErrorResponse) => of(updateArticleFailureAction({error: errorResponse.error.errors}))
          )
        )
      )
    )
  );

  redirectAfterUpdate$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateArticleSuccessAction),
      tap(({article}) => {
        this.router.navigate(['/article', article.slug]);
      })
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {
  }
}

