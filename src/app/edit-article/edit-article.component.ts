import {Component, inject, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from './store/actions/getArticle.action';
import {ArticleInputInterface} from '../shared/types/articleInput.interface';
import {articleSelector, errorsSelector, isLoadingSelector, isSubmittingSelector} from './store/selectors';
import {filter, map, Observable} from 'rxjs';
import {BackendErrorsInterface} from '../shared/types/backendErrors.interface';
import {ArticleFormComponent} from '../shared/article-form/article-form.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {ArticleInterface} from '../shared/types/article.interface';
import {LoadingComponent} from '../shared/loading/loading.component';
import {updateArticleAction} from './store/actions/editArticle.action';

@Component({
  selector: 'mc-edit-article',
  standalone: true,
  imports: [
    ArticleFormComponent,
    AsyncPipe,
    LoadingComponent,
    NgIf
  ],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})
export class EditArticleComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);

  slug: string;
  isSubmitting$: Observable<boolean>;
  isLoadings$: Observable<boolean>;
  initialValues$: Observable<ArticleInputInterface>;
  backendErrors$: Observable<BackendErrorsInterface>;


  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.isLoadings$ = this.store.pipe(select(isLoadingSelector))
    this.backendErrors$ = this.store.pipe(select(errorsSelector))
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      })
    )

  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    debugger
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}))
  }

}
