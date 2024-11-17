import { Component, inject, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from './store/actions/getFeed.action';
import { map, Observable } from 'rxjs';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from './store/selectors';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';

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
    ],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
    @Input('apiUrl') apiUrlProps: string;

    store = inject(Store);

    feed$: Observable<GetFeedResponseInterface | null>;
    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
        this.feed$.pipe(map((el) => el?.articles)).subscribe((state) => {
            console.log(state);
        });
    }

    initializeValues(): void {
        this.feed$ = this.store.pipe(select(feedSelector));
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
    }

    fetchData(): void {
        this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
    }
}
