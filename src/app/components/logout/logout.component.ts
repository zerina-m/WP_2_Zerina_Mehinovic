import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  standalone: false,

  template: `<h3>You are being logged out...</h3>`,
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private userService: UserService, private router: Router) {
    this.logoutUser();
  }

  logoutUser() {
    this.userService.logout().subscribe({
      next: (response: any) => {
        if (response.success) {
          alert(response.message);
          this.router.navigate(['/login']);
        } else {
          alert('Logout failed');
        }
      },
      error: (err: unknown) => {
        console.error('Logout error:', err);
        alert('An error occurred during logout');
      }
    });
  }
}
