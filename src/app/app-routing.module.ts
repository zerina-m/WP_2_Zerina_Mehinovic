import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { NewsComponent } from './components/news/news.component';
import { UsersComponent } from './components/users/users.component';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { GamesComponent } from './components/games/games.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthGuard } from './services/auth.guard';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
