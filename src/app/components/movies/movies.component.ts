import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  standalone: false,

  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  isReviewModalOpen = false;
  reviewContent = '';
  currentType = 'movie';

  constructor(private http: HttpClient, private authService: AuthService) {}

      ngOnInit(): void {
        this.fetchMovies();
      }

      fetchMovies(): void {
        this.http.get<any[]>('http://localhost/angular-api/fetch_movies.php').subscribe(
          (data) => {
            this.movies = data;
          },
          (error) => {
            console.error('Error fetching movies:', error);
          }
        );
      }

      openReviewModal(type: string): void {
        this.currentType = type;
        this.isReviewModalOpen = true;
      }

      closeReviewModal(): void {
        this.isReviewModalOpen = false;
        this.reviewContent = '';
      }

      submitReview(): void {
        const userId = this.authService.getUserId();

        if (!userId) {
          alert('You must be logged in to submit a review.');
          return;
        }

        const reviewData = {
          user_id: userId,
          type: this.currentType,
          review: this.reviewContent,
        };

        this.http.post('http://localhost/angular-api/submit_review.php', reviewData).subscribe(
          (response: any) => {
            if (response.success) {
              alert('Review submitted successfully!');
            } else {
              alert('Failed to submit review: ' + response.message);
            }
            this.closeReviewModal();
          },
          (error: any) => {
            alert('An error occurred while submitting your review.');
            console.error(error);
            this.closeReviewModal();
          }
        );
      }

}
