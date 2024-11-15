import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedService } from '../services/feed.service';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../store/actions/getFeed.action';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {
  // из конструктора не работает
  actions$ = inject(Actions);

  getFeedEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      exhaustMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({ feed });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(getFeedFailureAction());
          })
        );
      })
    )
  );

  constructor(private feedService: FeedService) {}
}
