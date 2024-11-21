import { Component } from '@angular/core';
import { FeedComponent } from '../shared/feed/feed.component';
import { BannerComponent } from '../shared/banner/banner.component';
import {PopularTagsComponent} from '../shared/popular-tags/popular-tags.component';

@Component({
    selector: 'mc-global-feed',
    standalone: true,
    imports: [FeedComponent, BannerComponent, PopularTagsComponent],
    templateUrl: './global-feed.component.html',
    styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
    apiUrl: string = '/articles';
}
