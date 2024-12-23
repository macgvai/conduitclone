import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {CurrentUserInterface} from '../shared/types/currentUser.interface';
import {filter, Observable, Subscription} from 'rxjs';
import {currentUserSelector} from '../store/selectors';
import {BackendErrorsInterface} from '../shared/types/backendErrors.interface';
import {isSubmittingSelector, validationErrorsSelector} from './store/selectors';
import {AsyncPipe, NgIf} from '@angular/common';
import {BackendErrorMessagesComponent} from '../shared/backendErrrorMessages/backend-error-messages.component';
import {updateCurrentUserAction} from '../store/actions/updateCurrentUser.action';
import {CurrentUserInputInterface} from '../shared/types/currentUserInput.interface';
import {logoutAction} from '../store/actions/syncAction';

@Component({
  selector: 'mc-settings',
  standalone: true,
  imports: [
    NgIf,
    BackendErrorMessagesComponent,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy{
  fb = inject(FormBuilder);
  store = inject(Store);
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendError$: Observable<BackendErrorsInterface | null>;

  ngOnInit(): void {
    this.initializeListeners()
    this.initializeValues()
  }

  initializeListeners(){
    this.currentUserSubscription = this.store.pipe(select(currentUserSelector), filter(Boolean)).subscribe((currentUser: CurrentUserInterface) => {
      this.currentUser = currentUser;

      this.initializeForm()
    })
  }

  initializeForm(){
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    })
  }

  initializeValues(){
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendError$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(){
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    }
    this.store.dispatch(updateCurrentUserAction({currentUserInput}))
  }

  logout(){
    this.store.dispatch(logoutAction())
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
}
