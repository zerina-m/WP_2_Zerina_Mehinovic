import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login(this.username, this.password).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    }, error => {
      console.log('Login error:', error);
      this.errorMessage = 'An error occurred';
    });
  }
}
