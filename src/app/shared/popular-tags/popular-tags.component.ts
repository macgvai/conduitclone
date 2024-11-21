import {Component, inject, OnInit} from '@angular/core';
import {LoadingComponent} from '../loading/loading.component';
import {ErrorMessageComponent} from '../error-message/error-message.component';
import {Store} from '@ngrx/store';
import {getPopularTagsAction} from './store/actions/getTags.action';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
    imports: [
        LoadingComponent,
        ErrorMessageComponent
    ],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss'
})
export class PopularTagsComponent implements OnInit{
    store = inject(Store)
    constructor() {}

    ngOnInit() {
        this.store.dispatch(getPopularTagsAction())
    }


}
