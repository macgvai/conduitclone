import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, exhaustMap, catchError} from 'rxjs/operators';
import {UserProfileService} from '../../services/user-profile.service';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {
  followProfileAction,
  followProfileFailureAction,
  followProfileSuccessAction
} from '../actions/followProfile.action';

@Injectable()
export class FollowProfileEffect {
  private actions$ = inject(Actions);
  private getUserProfileService = inject(UserProfileService);

  followProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(followProfileAction),
      exhaustMap(({user}) => this.getUserProfileService.followUser(user)
        .pipe(
          map((profile: ProfileInterface) => (followProfileSuccessAction({userProfile: profile}))),
          catchError(() => of(followProfileFailureAction()))
        ))
    );
  });
}
