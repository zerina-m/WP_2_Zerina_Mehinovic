import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://localhost/angular-api/news.php';

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
      return this.http.get(this.apiUrl);
  }
}
