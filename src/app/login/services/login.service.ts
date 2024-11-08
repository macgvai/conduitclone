import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequestInterface} from '../types/loginRequest.interface';
import {map, Observable} from 'rxjs';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {AuthResponseInterface} from '../../shared/types/authResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient)
  constructor() { }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url =  environment.apiUrl + '/users/login'

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map( (response: AuthResponseInterface) => response.user ));
  }
}
