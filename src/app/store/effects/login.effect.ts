import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, catchError, exhaustMap, tap} from 'rxjs/operators'
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from '../actions/register.action'
import {of} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {PersistenceService} from '../../shared/services/persistence.service';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {loginAction, loginFailureAction, loginSuccessAction} from '../actions/login.action';
import {LoginService} from '../../login/services/login.service';

@Injectable()
export class LoginEffect {
// из конструктора не работает
  actions$ = inject(Actions)

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      exhaustMap(({request}) => {
        return this.loginService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {

            this.persistenceService.set('accessToken', currentUser.token)
            // window.localStorage.setItem('accessToken', currentUser.token)
            return loginSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResponse.error.errors}))
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

  constructor(private loginService: LoginService, private persistenceService: PersistenceService, private router: Router) {
  }
}
