import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  form: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void{
    this.form = this.fb.group({
      username: '',
      email: '',
      password: ''
    })
    console.log(this.form)
  }

  onSubmit(): void {
    console.log(this.form.value)
  }

}
