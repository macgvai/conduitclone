import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, catchError, exhaustMap, tap} from 'rxjs/operators'
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from '../actions/register.action'
import {of} from 'rxjs'
import {RegisterService} from '../../services/register.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {Router} from '@angular/router';

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

            this.persistenceService.set('accessToken', currentUser.token)
            // window.localStorage.setItem('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  )

  redirectAfterSubmit = createEffect(() =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(
          () => {
            this.router.navigateByUrl('/')
          }
        )
      ),
    {
      dispatch: false
    }
  )

  constructor(private authService: RegisterService, private persistenceService: PersistenceService, private router: Router) {
  }
}
