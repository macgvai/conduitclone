import {inject, Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, exhaustMap} from 'rxjs/operators'
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from '../actions/register.action'
import {of} from 'rxjs'
import {RegisterService} from '../../services/register.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

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

          catchError(() => {
            return of(registerFailureAction())
          })
        )
      })
    )
  )

  constructor(private authService: RegisterService) {}
}
