import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  standalone: false,

  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

    books: any[] = [];
    isReviewModalOpen = false;
    reviewContent = '';
    currentType = 'book';
    currentBookId: number | null = null;

    constructor(private http: HttpClient, private authService: AuthService) {}

    ngOnInit(): void {
      this.fetchBooks();
    }

    fetchBooks(): void {
      this.http.get('http://localhost/angular-api/fetch_books.php').subscribe({
        next: (response: any) => {
          if (response.success) {
            this.books = response.data;
          } else {
            alert('Failed to fetch books: ' + response.message);
          }
        },
        error: (error: any) => {
          console.error('Error fetching books:', error);
          alert('An error occurred while fetching books.');
        }
      });
    }

    openReviewModal(bookId: number): void {
      this.currentBookId = bookId;
      this.isReviewModalOpen = true;
    }

    closeReviewModal(): void {
      this.isReviewModalOpen = false;
      this.reviewContent = '';
      this.currentBookId = null;
    }

    submitReview(): void {
      const userId = this.authService.getUserId();

      if (!userId) {
        alert('You must be logged in to submit a review.');
        return;
      }

      const reviewData = {
        user_id: userId,
        book_id: this.currentBookId,
        type: this.currentType,
        review: this.reviewContent,
      };

      this.http.post('http://localhost/angular-api/submit_review.php', reviewData).subscribe({
        next: (response: any) => {
          if (response.success) {
            alert('Review submitted successfully!');
          } else {
            alert('Failed to submit review: ' + response.message);
          }
          this.closeReviewModal();
        },
        error: (error: any) => {
          console.error('Error submitting review:', error);
          alert('An error occurred while submitting your review.');
          this.closeReviewModal();
        }
      });
    }
}
