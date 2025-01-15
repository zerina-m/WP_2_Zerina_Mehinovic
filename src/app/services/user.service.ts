import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = 'http://localhost/angular-api';

  constructor(private http: HttpClient) {}

  isLoggedIn(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/is_logged_in.php`);
  }

  registerUser(user: any): Observable<ResponseModel> {
      return this.http.post<ResponseModel>(`${this.apiBaseUrl}/register.php`, user);
  }

  login(credentials: any): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiBaseUrl}/login.php`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/logout.php`, {});
  }

}
