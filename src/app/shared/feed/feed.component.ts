import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    // this.store.dispatch()
  }
}
