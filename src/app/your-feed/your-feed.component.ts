import { Component } from '@angular/core';
import { FeedComponent } from '../shared/feed/feed.component';
import { BannerComponent } from '../shared/banner/banner.component';
import {PopularTagsComponent} from '../shared/popular-tags/popular-tags.component';
import {FeedTogglerComponent} from '../shared/feed-toggler/feed-toggler.component';

@Component({
  selector: 'mc-your-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './your-feed.component.html',
  styleUrl: './your-feed.component.scss',
})
export class YourFeedComponent {
  apiUrl: string = '/articles/feed';
}
