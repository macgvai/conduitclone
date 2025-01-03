import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private persistenceService = inject(PersistenceService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceService.get('accessToken');

    req = req.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    });
    return next.handle(req);
  }
}
