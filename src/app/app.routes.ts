import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {GlobalFeedComponent} from './global-feed/global-feed.component';
import {YourFeedComponent} from './your-feed/your-feed.component';
import {TagFeedComponent} from './tag-feed/tag-feed.component';
import {ArticleComponent} from './article/article.component';

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: GlobalFeedComponent},
  {path: 'feed', component: YourFeedComponent},
  {path: 'tags/:slug', component: TagFeedComponent},
  {path: 'article/:slug', component: ArticleComponent},
];
