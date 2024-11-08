import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { registerAction } from '../store/actions/register.action';
import { RegisterService } from './services/register.service';
import { Observable } from 'rxjs';
import {isSubmittingSelector, validationErrorsSelector} from '../store/selectors';
import { AppStateInterface } from '../shared/types/appState.interface';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {RegisterRequestInterface} from './types/registerRequest.interface';
import {BackendErrorsInterface} from '../shared/types/backendErrors.interface';
import {BackendErrorMessagesComponent} from '../shared/backendErrrorMessages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, NgIf, NgForOf, BackendErrorMessagesComponent],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  validationErrors$: Observable<BackendErrorsInterface | null>;


  private fb = inject(FormBuilder);
  private store = inject(Store);
  private service = inject(RegisterService);

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: '',
      email: '',
      password: '',
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }

    this.store.dispatch(registerAction({request}))
  }
}
