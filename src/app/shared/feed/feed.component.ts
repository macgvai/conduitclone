import {Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFeedAction} from './store/actions/getFeed.action';
import {Observable, Subscription} from 'rxjs';
import {GetFeedResponseInterface} from './types/getFeedResponse.interface';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from './store/selectors';
import {AsyncPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {BannerComponent} from '../banner/banner.component';
import {ErrorMessageComponent} from '../error-message/error-message.component';
import {LoadingComponent} from '../loading/loading.component';
import {environment} from '../../../environments/environment.development';
import {PaginationComponent} from '../pagination/pagination.component';
import queryString from 'query-string';
import {TagListComponent} from '../tag-list/tag-list.component';
import {AddToFavoritesComponent} from '../add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    RouterLink,
    NgOptimizedImage,
    BannerComponent,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
    DatePipe,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps: string;

  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  feed$: Observable<GetFeedResponseInterface | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  limit: number = environment.limit;
  baseUrl: string;
  currentPage: number;
  queryParamsSubscription: Subscription;

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      }
    );
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedURL = queryString.parseUrl(this.apiUrlProps);
    const stringifiedURL = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedURL.query
    })
    const apiUrlWithParams = `${parsedURL.url}?${stringifiedURL}`;

    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged = !changes['apiUrlProps'].firstChange && changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }
}
