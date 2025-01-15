import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: number | null = null;

  constructor(private http: HttpClient) {}

  setUserId(id: number): void {
    this.userId = id;
    localStorage.setItem('userId', id.toString());
  }

  getUserId(): number | null {
    if (!this.userId) {
      const storedId = localStorage.getItem('userId');
      this.userId = storedId ? +storedId : null;
    }
    return this.userId;
  }

  clearUserData(): void {
    this.userId = null;
    localStorage.removeItem('userId');
  }

  register(userData: any): Observable<any> {
    return this.http.post(`http://localhost/angular-api/register.php`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`http://localhost/angular-api/login.php`, userData);
  }

  logout(): void {
    this.clearUserData();
  }
}
