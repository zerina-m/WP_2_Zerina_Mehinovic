import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewsComponent } from './components/news/news.component';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { BooksComponent } from './components/books/books.component';
import { MoviesComponent } from './components/movies/movies.component';
import { GamesComponent } from './components/games/games.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/news', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NewsComponent,
    UsersComponent,
    AppComponent,
    MoviesComponent,
    GamesComponent,
    BooksComponent,
    LogoutComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
