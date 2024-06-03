import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-publiclist',
  templateUrl: './publiclist.component.html',
  styleUrls: ['./publiclist.component.scss'],
})
export class PublicListComponent implements OnInit {
  publicList: any[] = [];
  currentUser: any;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.userName) {
      this.movieService
        .getPublicList(this.currentUser.userName)
        .subscribe((list: any) => {
          this.publicList = list;
        });
    } else {
      console.error('No user is logged in');
    }
  }

  removeFromPublicList(movie: any): void {
    if (this.currentUser && this.currentUser.userName) {
      this.movieService
        .getPublicList(this.currentUser.userName)
        .subscribe((list: any) => {
          const updatedList = list.filter(
            (m: any) => m.imdbID !== movie.imdbID
          );
          this.movieService
            .updatePublicList(this.currentUser.userName, updatedList)
            .subscribe(() => {
              this.publicList = updatedList;
              console.log('Removed from public list');
            });
        });
    } else {
      console.error('No user is logged in');
    }
  }
}
