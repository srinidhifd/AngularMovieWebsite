import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any = null;

  constructor() {
    this.loadUserFromLocalStorage();
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
    this.saveUserToLocalStorage();
    console.log('Logged In User Details:', this.currentUser);
  }

  getCurrentUser() {
    console.log('Get Logged In User Details:', this.currentUser);
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    console.log('User logged out');
    alert('The User logged Out');
  }

  private saveUserToLocalStorage() {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  private loadUserFromLocalStorage() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }
}
