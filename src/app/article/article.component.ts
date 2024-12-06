import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getArticleAction} from './store/actions/getArticle.action';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ArticleInterface} from '../shared/types/article.interface';
import {combineLatest, combineLatestWith, elementAt, map, Observable, Subscription} from 'rxjs';
import {errorSelector, getArticleSelector, isLoadingArticleSelector} from './store/selectors';
import {currentUserSelector} from '../store/selectors';
import {CurrentUserInterface} from '../shared/types/currentUser.interface';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {LoadingComponent} from '../shared/loading/loading.component';
import {ErrorMessageComponent} from '../shared/error-message/error-message.component';
import {TagListComponent} from '../shared/tag-list/tag-list.component';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterLink,
    NgOptimizedImage,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit, OnDestroy {
  store = inject(Store)
  route = inject(ActivatedRoute)

  slug: string
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingArticleSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  initializeListeners() {
    this.articleSubscription = this.store
      .pipe(select(getArticleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article
      })

    // deprecated
    // this.isAuthor$ = combineLatest(
    //   this.store.pipe(select(getArticleSelector)),
    //   this.store.pipe(select(currentUserSelector))
    // ).pipe(map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]) => {
    //   console.log(article, currentUser);
    //   return false;
    // }))

    this.isAuthor$ = this.store.pipe(select(getArticleSelector)).pipe(
      combineLatestWith(this.store.pipe(select(currentUserSelector))),
      map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]) => {
        if (!article || !currentUser) {
          return false
        }

        return currentUser.username === article.author.username
      })
    )
  }

  fetchData() {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe()
  }
}
