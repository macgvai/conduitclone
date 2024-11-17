import { Component } from '@angular/core';
import { FeedComponent } from '../shared/feed/feed.component';
import { BannerComponent } from '../shared/banner/banner.component';

@Component({
    selector: 'mc-global-feed',
    standalone: true,
    imports: [FeedComponent, BannerComponent],
    templateUrl: './global-feed.component.html',
    styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
    apiUrl: string = '/articles';
}
