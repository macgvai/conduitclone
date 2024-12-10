import { Component } from '@angular/core';
import {ArticleFormComponent} from '../shared/article-form/article-form.component';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [
    ArticleFormComponent
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss'
})
export class CreateArticleComponent {
  initialValues = {
    title: 'aaa',
    description: 'aaa',
    body: 'aa',
    tagList: ['aaa', 'bbb']
  }

  onSubmit(res: any) {
    console.log(res)
  }
}
