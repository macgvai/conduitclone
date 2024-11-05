import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {AuthResponseInterface} from '../../shared/types/authResponse.interface';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // private http = inject(HttpClient);

  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url =  environment.apiUrl + '/users'

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map( (response: AuthResponseInterface) => response.user ));
  }

}
