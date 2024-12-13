import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ArticleInputInterface} from '../types/articleInput.interface';
import {BackendErrorsInterface} from '../types/backendErrors.interface';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BackendErrorMessagesComponent} from '../backendErrrorMessages/backend-error-messages.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'mc-article-form',
  standalone: true,
  imports: [
    BackendErrorMessagesComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<ArticleInputInterface>();

  form: FormGroup;
  private fb = inject(FormBuilder);


  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(' ')
    })
  }

  onSubmit() {
    const formValue = this.form.value
    const articleFormValues: ArticleInputInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }

    console.log(articleFormValues)
    this.articleSubmitEvent.emit(articleFormValues)
  }
}
