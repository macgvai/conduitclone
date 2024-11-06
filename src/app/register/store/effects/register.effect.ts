import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, catchError, exhaustMap} from 'rxjs/operators'
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from '../actions/register.action'
import {of} from 'rxjs'
import {RegisterService} from '../../services/register.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class RegisterEffect {
// из конструктора не работает
  actions$ = inject(Actions)

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      exhaustMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log(currentUser)
            return registerSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  )

  constructor(private authService: RegisterService) {}
}
