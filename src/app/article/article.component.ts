import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getArticleAction} from './store/actions/getArticle.action';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  store = inject(Store)

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.store.dispatch(getArticleAction({slug: 'optio-sed-laboriosam-omnis'}))
  }
}
