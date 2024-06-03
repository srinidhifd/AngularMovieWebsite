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

  constructor(
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.searchMovies('Batman');
    // this.movieService.getMovieDetails('tt0372784').subscribe();
  }

  searchMovies(query: string): void {
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
