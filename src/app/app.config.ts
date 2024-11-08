import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {combineReducers, provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
// import {registerReducer} from './register/store/reducers';
import {provideHttpClient} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {RegisterEffect} from './store/effects/register.effect';
import {LoginEffect} from './store/effects/login.effect';
import {authReducer} from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideState({name: 'auth', reducer: authReducer}),
    provideHttpClient(),
    provideEffects([RegisterEffect, LoginEffect]),

  ]
};


