import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/response.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onLogin(): void {

        if (this.username.trim() === '' || this.password.trim() === '') {
          this.errorMessage = 'All fields are required';
          return;
        }

        const user = { username: this.username, password: this.password };

        this.authService.login(user).subscribe(
              (response) => {
                if (response.message === 'Login successful') {
                  this.authService.setUserId(response.id);
                  alert('Login successful');
                  this.router.navigate(['/news']);
                } else {
                  this.errorMessage = response.message;
                }
              },
            (error) => {
              this.errorMessage = 'An error occurred while logging in';
              console.error(error);
            }
        );
    }
}
