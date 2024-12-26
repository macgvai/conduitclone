import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError} from 'rxjs/operators';
import {UserProfileService} from '../../services/user-profile.service';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from '../actions/getUserProfile.action';
import {ProfileInterface} from '../../../shared/types/profile.interface';

@Injectable()
export class GetUserProfileEffect {
  private actions$ = inject(Actions);
  private getUserProfileService = inject(UserProfileService);

  getUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserProfileAction),
      exhaustMap(({slug}) => this.getUserProfileService.getUserProfile(slug)
        .pipe(
          map((profile: ProfileInterface) => (getUserProfileSuccessAction({userProfile: profile}))),
          catchError(() => of(getUserProfileFailureAction()))
        ))
    );
  });
}
