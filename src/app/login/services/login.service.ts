import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient)
  constructor() { }

  login(request): any {
    const url =  environment.apiUrl + '/users/login'
      console.log('login!!!', request)
    this.http.post(url,request).subscribe()
  }
}
