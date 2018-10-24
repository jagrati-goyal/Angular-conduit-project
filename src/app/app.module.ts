import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthDirective } from './auth.directive';
import { HomeResolver } from './home/home-resolver';
import { AddArticleComponent } from './articles/addArticle/add-article.component';
import { AddArticleResolver } from './articles/addArticle/add-resolver';
import { AuthGuard } from './services/auth-guard.service';
import { HttpTokenInterceptor } from './http-token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoAuthGuard } from './services/no-auth-guard.service';
import { SettingsComponent } from './settings/settings.component';
import { DisplayArticleComponent } from './articles/display-article/display-article.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileResolver } from './profile/profile-resolver.service';
import { ArticleResolver } from './articles/article-resolver.service';
import { ArticleCommentsComponent } from './articles/article-comments/article-comments.component';
import { ProfileArticlesComponent } from './profile/profile-articles/profile-articles.component';
import { ProfileFavoriteComponent } from './profile/profile-favorite/profile-favorite.component';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, resolve: { isAuthenticated: HomeResolver }
  },
  {
    path : 'login', component: LoginComponent, canActivate: [NoAuthGuard]
  },
  {
    path : 'register', component: SignupComponent, canActivate: [NoAuthGuard]
  },
  {
    path : 'article/:slug', component: DisplayArticleComponent, 
    resolve : { article : ArticleResolver}
  },
  {
    path : 'editor', component: AddArticleComponent, canActivate: [AuthGuard]
  },
  {
    path : 'editor/:slug', component: AddArticleComponent,canActivate: [AuthGuard], resolve : { article : AddArticleResolver }
  },
  {
    path : 'settings', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path : 'profile/:username', component: ProfileComponent, resolve : { profile : ProfileResolver }, children : [
      {
        path : '', component : ProfileArticlesComponent
      },
      {
        path : 'favorites', component : ProfileFavoriteComponent
      }
    ] 
  },
  {
    path: '**', redirectTo: '/', pathMatch : 'full'
  }

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ArticlesComponent,
    AddArticleComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthDirective,
    SettingsComponent,
    DisplayArticleComponent,
    ProfileComponent,
    ArticleCommentsComponent,
    ProfileArticlesComponent,
    ProfileFavoriteComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    HomeResolver, 
    AddArticleResolver,
    ArticleResolver,
    ProfileResolver,
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
