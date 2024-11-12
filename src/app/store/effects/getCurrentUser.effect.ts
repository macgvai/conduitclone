import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, catchError, exhaustMap, tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http';
import {PersistenceService} from '../../shared/services/persistence.service';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {LoginService} from '../../login/services/login.service';
import {
  getCurrentUserAction,
  getCurrentUserActionFailure,
  getCurrentUserActionSuccess
} from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffect {
// из конструктора не работает
  actions$ = inject(Actions)

  getCurrentUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      exhaustMap(() => {

        if (!this.persistenceService.get('accessToken')) {
          return of(getCurrentUserActionFailure())
        }

        return this.loginService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {

            // this.persistenceService.set('accessToken', currentUser.token)
            // window.localStorage.setItem('accessToken', currentUser.token)
            return getCurrentUserActionSuccess({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCurrentUserActionFailure())
          })
        )
      })
    )
  )

  constructor(private loginService: LoginService, private persistenceService: PersistenceService) {
  }
}
