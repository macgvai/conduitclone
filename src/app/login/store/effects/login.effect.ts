import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {map, exhaustMap, catchError, tap} from 'rxjs/operators';
import {LoginService} from '../../services/login.service';
import {loginAction} from '../actions/login.action';

@Injectable()
export class LoginEffect {

  actions$ = inject(Actions)

  loginEffect = createEffect(() => this.actions$.pipe(
      ofType(loginAction),
      tap(({request}) => {
          this.loginService.login(request)
        }
      )
    ),
    {
      dispatch: false
    }
  );

  constructor(
    private loginService: LoginService
  ) {}
}
