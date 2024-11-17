import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {TopBarComponent} from './shared/top-bar/top-bar.component';
import {Store} from '@ngrx/store';
import {getCurrentUserAction} from './store/actions/getCurrentUser.action';
import {BannerComponent} from './shared/banner/banner.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RegisterComponent,
        TopBarComponent,
        BannerComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    store = inject(Store);
    ngOnInit(): void {
        this.store.dispatch(getCurrentUserAction());
    }
}
