import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/response.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

    onRegister(): void {

      if (!this.user.first_name || !this.user.last_name || !this.user.username || !this.user.email || !this.user.password || !this.user.confirm_password)  {
        this.errorMessage = 'All fields are required';
        return;
      }

    if (this.user.password !== this.user.confirm_password) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

      this.authService.register(this.user).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Registration successful');
            this.router.navigate(['/login']);
          } else {
            console.log('Registration failed: ', response.message);
          }
        },
          (error: any) => {
            console.log('Error:', error);
          }
      );
    }
}
