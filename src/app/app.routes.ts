import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {GlobalFeedComponent} from './global-feed/global-feed.component';
import {YourFeedComponent} from './your-feed/your-feed.component';
import {TagFeedComponent} from './tag-feed/tag-feed.component';
import {ArticleComponent} from './article/article.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {SettingsComponent} from './settings/settings.component';

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: GlobalFeedComponent},
  {path: 'feed', component: YourFeedComponent},
  {path: 'tags/:slug', component: TagFeedComponent},
  {path: 'article/new', component: CreateArticleComponent},
  {path: 'article/:slug', component: ArticleComponent},
  {path: 'article/:slug/edit', component: EditArticleComponent},
  {path: 'settings', component: SettingsComponent},
];
