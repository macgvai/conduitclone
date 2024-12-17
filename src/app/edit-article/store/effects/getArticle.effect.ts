import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError, tap} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/getArticle.action';

@Injectable()
export class GetArticleEditEffect {

  getArticle$ = createEffect(
    () => this.actions$.pipe(
      ofType(getArticleAction),
      exhaustMap(({slug}) => this.sharedArticleService.getArticles(slug)
        .pipe(
          map((article: ArticleInterface) => getArticleSuccessAction({article})),
          catchError(
            () => of(getArticleFailureAction())
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
  ) {}
}

