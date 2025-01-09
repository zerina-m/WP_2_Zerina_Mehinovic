import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    };

    private apiUrl = 'http://localhost/api/register.php';

    constructor(private http: HttpClient, private router: Router) {}

    onSubmit(): void {
      // Check if passwords match
      if (this.user.password !== this.user.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      this.http.post(this.apiUrl, this.user).subscribe(
        response => {
          console.log('User registered successfully', response);
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('There was an error!', error);
          alert('Registration failed. Please try again.');
        }
      );
    }
}
