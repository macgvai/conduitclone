import {Component, inject, OnInit} from '@angular/core';
import {LoadingComponent} from '../loading/loading.component';
import {ErrorMessageComponent} from '../error-message/error-message.component';
import {select, Store} from '@ngrx/store';
import {getPopularTagsAction} from './store/actions/getTags.action';
import {Observable} from 'rxjs';
import {errorSelector, isLoadingSelector, selectTagsSelector} from './store/selectors';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PopularTagType} from '../types/popularTagType';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [
    LoadingComponent,
    ErrorMessageComponent,
    NgForOf,
    AsyncPipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss'
})
export class PopularTagsComponent implements OnInit {
  store = inject(Store)

  popularTags$: Observable<PopularTagType[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  ngOnInit() {
    this.initializeValues()
    this.fetchData()
  }

  fetchData() {
    this.store.dispatch(getPopularTagsAction())
  }

  initializeValues() {
    this.popularTags$ = this.store.pipe(select(selectTagsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
}
