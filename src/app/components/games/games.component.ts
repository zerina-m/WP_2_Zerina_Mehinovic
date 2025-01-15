import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-games',
  standalone: false,

  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: any[] = [];
  isReviewModalOpen = false;
  reviewContent = '';
  currentType = 'game';

  constructor(private http: HttpClient, private authService: AuthService) {}

      ngOnInit(): void {
         this.fetchGames();
       }

      fetchGames(): void {
        this.http.get<any[]>('http://localhost/angular-api/fetch_games.php').subscribe(
          (data) => {
            this.games = data;
          },
          (error) => {
            console.error('Error fetching games:', error);
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
