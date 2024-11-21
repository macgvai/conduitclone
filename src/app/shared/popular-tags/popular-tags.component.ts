import {Component, inject, OnInit} from '@angular/core';
import {LoadingComponent} from '../loading/loading.component';
import {ErrorMessageComponent} from '../error-message/error-message.component';
import {select, Store} from '@ngrx/store';
import {getPopularTagsAction} from './store/actions/getTags.action';
import {Observable} from 'rxjs';
import {PopularTagsStateInterface} from './types/popularTagsState.interface';
import {selectTags} from './store/selectors';
import {GetPopularTagsInterface} from './types/getPopularTags.interface';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [
    LoadingComponent,
    ErrorMessageComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss'
})
export class PopularTagsComponent implements OnInit{
  store = inject(Store)

  popularTags$: Observable<string[]>

  ngOnInit() {
    this.initializeValues()
  }

  initializeValues() {
    this.store.dispatch(getPopularTagsAction())
    this.popularTags$ = this.store.pipe(select(selectTags))
    }
}
