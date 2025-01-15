import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private baseUrl = 'http://localhost/angular_api';

  constructor(private http: HttpClient) {}

  getReviews(table: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/get_reviews.php?table=${table}`);
    }

  addReview(table: string, review: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/add_review.php`, { table, ...review });
    }

  deleteReview(table: string, id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete_review.php?table=${table}&id=${id}`);
    }

  updateReview(table: string, id: number, review: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/update_review.php`, { table, id, ...review });
    }

}
