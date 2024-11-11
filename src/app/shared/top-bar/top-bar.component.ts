import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {currentUserSelector, isAnonymousSelector, isLoggedInSelector, selectRegister} from '../../store/selectors';
import {CurrentUserInterface} from '../types/currentUser.interface';
import {select, Store} from '@ngrx/store';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit{
  isLoggedIn$: Observable<boolean>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  private store= inject(Store)

  ngOnInit(): void {
    this.initializeValues()
  }
  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

}

