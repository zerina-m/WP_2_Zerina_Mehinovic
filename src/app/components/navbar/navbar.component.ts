import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe(
      (response: any) => {
        this.isLoggedIn = response.loggedIn;
      },
      (error: any) => {
        console.error('Error checking login status:', error);
        this.isLoggedIn = false;
      }
    );
  }

  search() {
    const apiUrl = `http://localhost/angular-api/search.php?searchTerm=${encodeURIComponent(this.searchTerm)}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (results: any[]) => {
        this.searchResults = results;
      },
      (error: any) => {
        console.error('Error fetching search results:', error);
      }
    );
  }
}
