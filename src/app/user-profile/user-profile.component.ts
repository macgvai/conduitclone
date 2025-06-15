import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfileInterface } from '../shared/types/profile.interface';
import { combineLatestWith, filter, map, Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getUserProfileAction } from './store/actions/getUserProfile.action';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  isLoadingSelector,
  userProfileErrorSelector,
  userProfileSelector,
} from './store/selectors';
import { currentUserSelector } from '../store/selectors';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { FeedComponent } from '../shared/feed/feed.component';
import {UserProfileService} from './services/user-profile.service';
import {followProfileAction} from './store/actions/followProfile.action';

@Component({
  selector: 'mc-user-profile',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, RouterLinkActive, FeedComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription: Subscription;
  slug: string;
  apiUrl: string;
  isCurrentUserProfile$: Observable<boolean>;

  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  service = inject(UserProfileService);

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(userProfileErrorSelector));
    // this.apiUrl = isFavorites
    //   ? `/articles?favorited=${this.slug}`
    //   : `/articles?author=${this.slug}`;
    this.isCurrentUserProfile$ = this.store.pipe(
      select(currentUserSelector),
      filter(Boolean),
      combineLatestWith(
        this.store.pipe(select(userProfileSelector), filter(Boolean))
      ),
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          ProfileInterface
        ]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }
  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }

  followUser(): void {
    this.store.dispatch(followProfileAction({user: this.userProfile}))
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }
}
