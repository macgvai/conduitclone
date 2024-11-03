import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { registerAction } from './store/actions/register.action';
import { RegisterService } from './register.service';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from './store/selectors';
import { AppStateInterface } from '../shared/types/appState.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;

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
  }

  onSubmit(): void {
    this.store.dispatch(registerAction(this.form.value));
    this.service.log();
    this.service.log1();
  }
}
