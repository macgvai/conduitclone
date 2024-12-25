import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError} from 'rxjs/operators';
import {AddToFavoritesService} from '../../services/add-to-favorites.service';
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from '../actions/addToFavorites.action';
import {on} from '@ngrx/store';
import {ArticleInterface} from '../../../types/article.interface';

@Injectable()
export class AddToFavoritesEffect {
  private actions$ = inject(Actions);
  private AddToFavoritesService = inject(AddToFavoritesService);

  addToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToFavoritesAction),
      exhaustMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? this.AddToFavoritesService.removeFromFavorites(slug)
          : this.AddToFavoritesService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => (addToFavoritesSuccessAction({article: article}))),
          catchError(() => of(addToFavoritesFailureAction()))
        )
      }),
    )
  });
}
