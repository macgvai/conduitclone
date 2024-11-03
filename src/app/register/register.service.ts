import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  log = function (): void {
    console.log(111);
  };

  log1(): void {
    console.log(222);
  }
}
