import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {BackendErrorMessagesComponent} from '../shared/backendErrrorMessages/backend-error-messages.component';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {loginAction} from '../store/actions/login.action';
import {LoginRequestInterface} from './types/loginRequest.interface';
import {isSubmittingSelector, validationErrorsSelector} from '../store/selectors';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../shared/types/backendErrors.interface';

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
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>;
  validationErrors$: Observable<BackendErrorsInterface | null>;

  private fb = inject(FormBuilder);
  private store = inject(Store)


  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value
    }

    this.store.dispatch(loginAction({request}))
  }
}
