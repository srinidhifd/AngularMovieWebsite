import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss'],
})
export class MoviedetailsComponent implements OnInit {
  movie: any;
  currentUser: any; // Store the entire user object

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.movieService.getMovieDetails(movieId).subscribe((response) => {
          this.movie = response;
        });
      }
    });

    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      console.log('currentUserName:', this.currentUser.userName);
    } else {
      // Handle case where user is not logged in
      console.error('No user is logged in');
    }
  }

  addToPublicList(): void {
    if (this.currentUser && this.currentUser.userName) {
      this.movieService
        .getPublicList(this.currentUser.userName)
        .subscribe((list: any) => {
          const movieExists = list.some(
            (m: any) => m.imdbID === this.movie.imdbID
          );
          if (movieExists) {
            alert('Movie already exists in your public list');
          } else {
            this.movieService
              .addToPublicList(this.currentUser.userName, this.movie)
              .subscribe(() => {
                console.log('Added to public list');
                this.router.navigate(['/publiclist']);
              });
          }
        });
    } else {
      console.error('User not logged in or userName is missing');
    }
  }

  addToPrivateList(): void {
    if (this.currentUser && this.currentUser.userName) {
      this.movieService
        .getPrivateList(this.currentUser.userName)
        .subscribe((list: any) => {
          const movieExists = list.some(
            (m: any) => m.imdbID === this.movie.imdbID
          );
          if (movieExists) {
            alert('Movie already exists in your private list');
          } else {
            this.movieService
              .addToPrivateList(this.currentUser.userName, this.movie)
              .subscribe(() => {
                console.log('Added to private list');
                this.router.navigate(['/privatelist']);
              });
          }
        });
    } else {
      console.error('User not logged in or userName is missing');
    }
  }

  onSelectChange(event: any): void {
    const selectedValue = event.target.value;
    if (selectedValue === 'public') {
      this.addToPublicList();
    } else if (selectedValue === 'private') {
      this.addToPrivateList();
    }
  }
}
