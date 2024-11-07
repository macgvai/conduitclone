import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {BackendErrorMessagesComponent} from '../shared/backendErrrorMessages/backend-error-messages.component';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {loginAction} from './store/actions/login.action';

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [
    AsyncPipe,
    BackendErrorMessagesComponent,
    NgIf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form: FormGroup

  private fb = inject(FormBuilder);
  private store = inject(Store)


  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    })
  }

onSubmit(): void {
    const request = {
      user: this.form.value

    }

  this.store.dispatch(loginAction({request: request}))
}

}
