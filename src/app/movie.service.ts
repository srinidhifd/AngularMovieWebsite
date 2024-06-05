import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = 'c2a68627';
  private apiUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}&`;
  private dbUrl = 'https://angularmoviewebsite.onrender.com'; // URL to your db.json server

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}s=${query}`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        console.log('Search Movies Response:', response);
      })
    );
  }

  getMovieDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}i=${id}`;
    return this.http.get<any>(url).pipe(
      tap((response: any) => {
        console.log('Movie Details Response:', response);
      })
    );
  }

  addToPublicList(username: string, movie: any): Observable<any> {
    return this.http
      .get<any[]>(`${this.dbUrl}/register?userName=${username}`)
      .pipe(
        switchMap((users) => {
          if (users.length > 0) {
            const user = users[0];
            user.publicList = user.publicList || [];
            user.publicList.push(movie);
            return this.http.put(`${this.dbUrl}/register/${user.id}`, user);
          } else {
            throw new Error('User not found');
          }
        })
      );
  }

  getPublicList(username: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.dbUrl}/register?userName=${username}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            return users[0].publicList || [];
          } else {
            throw new Error('User not found');
          }
        })
      );
  }

  updatePublicList(username: string, updatedList: any[]): Observable<any> {
    return this.http
      .get<any[]>(`${this.dbUrl}/register?userName=${username}`)
      .pipe(
        switchMap((users) => {
          if (users.length > 0) {
            const user = users[0];
            user.publicList = updatedList;
            return this.http.put(`${this.dbUrl}/register/${user.id}`, user);
          } else {
            throw new Error('User not found');
          }
        })
      );
  }

  addToPrivateList(username: string, movie: any): Observable<any> {
    return this.http
      .get<any[]>(`${this.dbUrl}/register?userName=${username}`)
      .pipe(
        switchMap((users) => {
          if (users.length > 0) {
            const user = users[0];
            user.privateList = user.privateList || [];
            user.privateList.push(movie);
            return this.http.put(`${this.dbUrl}/register/${user.id}`, user);
          } else {
            throw new Error('User not found');
          }
        })
      );
  }

  getPrivateList(username: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.dbUrl}/register?userName=${username}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            return users[0].privateList || [];
          } else {
            throw new Error('User not found');
          }
        })
      );
  }

  updatePrivateList(username: string, updatedList: any[]): Observable<any> {
    return this.http
      .get<any[]>(`${this.dbUrl}/register?userName=${username}`)
      .pipe(
        switchMap((users) => {
          if (users.length > 0) {
            const user = users[0];
            user.privateList = updatedList;
            return this.http.put(`${this.dbUrl}/register/${user.id}`, user);
          } else {
            throw new Error('User not found');
          }
        })
      );
  }
}
