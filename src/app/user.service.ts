import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {}

    getUserData(): Observable<any> {
      return this.http.get(`${this.apiUrl}/get-user-data.php`);
    }

    login(username: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}login.php`, { username, password });
    }

    register(user: any): Observable<any> {
      return this.http.post(`${this.apiUrl}register.php`, user);
    }

    changePassword(username: string, currentPassword: string, newPassword: string): Observable<any> {
      return this.http.post(`${this.apiUrl}change_password.php`, { username, current_password: currentPassword, new_password: newPassword });
    }
}
