import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError} from 'rxjs/operators';
import {ActionType} from '../actionType';
import {PopularTagsService} from '../../services/popularTags.service';

@Injectable()
export class GetPopularTagsEffect {
  actions$ = inject(Actions)
  popularTagsService = inject(PopularTagsService)

  getPopularTagsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.GET_POPULAR_TAGS),
      exhaustMap(() => this.popularTagsService.getPopularTags()
        .pipe(
          map(movies => ({type: '[Movies API] Movies Loaded Success', payload: movies})),
          catchError(() => of({type: '[Movies API] Movies Loaded Error'}))
        )
      )
    )
  );

  constructor(
    // private actions$: Actions,
    // private popularTagsService = PopularTagsService
  ) {
  }
}
