import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';
  searched: boolean = false;
  currentUser: any;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  searchMovies(query: string): void {
    if (query.trim() === '') {
      this.searched = false;
      return;
    }

    this.searched = true;
    this.movieService.searchMovies(query).subscribe((response) => {
      if (response && response.Search) {
        this.movies = response.Search;
      } else {
        this.movies = [];
      }
    });
  }

  onSearch(): void {
    this.searchMovies(this.searchQuery);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
