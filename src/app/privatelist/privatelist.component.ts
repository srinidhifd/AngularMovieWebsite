import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-privatelist',
  templateUrl: './privatelist.component.html',
  styleUrls: ['./privatelist.component.scss'],
})
export class PrivateListComponent implements OnInit {
  privateList: any[] = [];
  currentUser: any;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.userName) {
      this.movieService
        .getPrivateList(this.currentUser.userName)
        .subscribe((list: any) => {
          this.privateList = list;
        });
    } else {
      console.error('No user is logged in');
    }
  }

  removeFromPrivateList(movie: any): void {
    if (this.currentUser && this.currentUser.userName) {
      this.movieService
        .getPrivateList(this.currentUser.userName)
        .subscribe((list: any) => {
          const updatedList = list.filter(
            (m: any) => m.imdbID !== movie.imdbID
          );
          this.movieService
            .updatePrivateList(this.currentUser.userName, updatedList)
            .subscribe(() => {
              this.privateList = updatedList;
              console.log('Removed from private list');
            });
        });
    } else {
      console.error('No user is logged in');
    }
  }
}
