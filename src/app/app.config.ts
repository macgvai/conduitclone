import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {RegisterEffect} from './store/effects/register.effect';
import {LoginEffect} from './store/effects/login.effect';
import {authReducer} from './store/reducers';
import {GetCurrentUserEffect} from './store/effects/getCurrentUser.effect';
import {PersistenceService} from './shared/services/persistence.service';
import {AuthInterceptor} from './shared/services/authInterceptor.service';

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
    provideHttpClient(withInterceptorsFromDi()),
    provideEffects([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
};


