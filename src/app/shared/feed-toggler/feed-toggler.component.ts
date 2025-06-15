import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { isLoggedInSelector } from '../../store/selectors';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;
  public store = inject(Store);

  isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
