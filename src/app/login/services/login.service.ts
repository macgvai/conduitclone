import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequestInterface} from '../types/loginRequest.interface';
import {map, Observable} from 'rxjs';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {AuthResponseInterface} from '../../shared/types/authResponse.interface';
import {CurrentUserInputInterface} from '../../shared/types/currentUserInput.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient)
  constructor() { }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url =  environment.apiUrl + '/users/login'

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map( this.getUser ));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url =  environment.apiUrl + '/user'

    return this.http
      .get<AuthResponseInterface>(url)
      .pipe(map( this.getUser ));
  }

  updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    const url =  environment.apiUrl + '/user'

    return this.http
      .put(url, currentUserInput)
      .pipe(map( this.getUser ));
  }
}
