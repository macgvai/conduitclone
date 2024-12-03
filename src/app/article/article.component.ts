import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getArticleAction} from './store/actions/getArticle.action';
import {ActivatedRoute} from '@angular/router';
import {getPopularTagsAction} from '../shared/popular-tags/store/actions/getTags.action';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  store = inject(Store)
  route = inject(ActivatedRoute)

  urlSlug: string

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues() {
    this.route.params.subscribe(params => {
      this.urlSlug = params['slug']
    })
  }

  fetchData() {
    this.store.dispatch(getArticleAction({slug: this.urlSlug}))
  }
}
