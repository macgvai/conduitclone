import {Component, inject, OnInit} from '@angular/core';
import { FeedComponent } from '../shared/feed/feed.component';
import { BannerComponent } from '../shared/banner/banner.component';
import {PopularTagsComponent} from '../shared/popular-tags/popular-tags.component';
import {FeedTogglerComponent} from '../shared/feed-toggler/feed-toggler.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mc-tag-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrl: './tag-feed.component.scss',
})
export class TagFeedComponent implements OnInit{
  route = inject(ActivatedRoute)

  apiUrl: string;
  tagName: string;

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.tagName = this.route.snapshot.paramMap.get('slug');
    this.apiUrl = `/articles?tag=${this.tagName}`;
  }
}
