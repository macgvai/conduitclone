import { Component, inject, OnInit } from '@angular/core';
import { ArticleFormComponent } from '../shared/article-form/article-form.component';
import { select, Store } from '@ngrx/store';
import { createArticleAction } from './store/actions/createArticle.action';
import { ArticleInputInterface } from '../shared/types/articleInput.interface';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../shared/types/backendErrors.interface';
import {
  createArticleErrorsSelector,
  isSubmittingSelector,
} from './store/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [ArticleFormComponent, AsyncPipe],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent implements OnInit {
  public store = inject(Store);

  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  isSubmitting$: Observable<boolean>;
  errors$: Observable<BackendErrorsInterface | null>;

  onSubmit(articleInput: ArticleInputInterface) {
    this.store.dispatch(createArticleAction({ articleInput }));
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errors$ = this.store.pipe(select(createArticleErrorsSelector));
  }
}
