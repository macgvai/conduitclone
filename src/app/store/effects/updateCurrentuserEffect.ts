import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {LoginService} from '../../login/services/login.service';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../actions/updateCurrentUser.action';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class UpdateCurrentUserEffect {

  updateCurrentUser$ = createEffect(() => this.actions$.pipe(
      ofType(updateCurrentUserAction),
      exhaustMap(({currentUserInput}) => this.loginService.updateCurrentUser(currentUserInput)
        .pipe(
          map(currentUser => (updateCurrentUserSuccessAction({currentUser}))),
          catchError((errorResponse: HttpErrorResponse) => of(updateCurrentUserFailureAction({error: errorResponse.error.errors})))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) {}
}
