import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);

  constructor() {}

  register(data): any {
    return this.http.post('http://localhost:3000/api/users', data);
  }

  log = function (): void {
    console.log(111);
  };

  log1(): void {
    console.log(222);
  }
}
