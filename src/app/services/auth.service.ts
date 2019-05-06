import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';


import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localhost: string;

  authToken: any;
  user: any;

  userRole: string;

  constructor(private http: HttpClient, private helper: JwtHelperService) {
    this.localhost = 'http://localhost:8000/';
    // this.localhost = '';

  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.localhost);
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.localhost);

  }
  storeUserData(token, user) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // loadToken() {
  //   const token = localStorage.getItem('access_token');
  //   this.authToken = token;
  // }


  loggedIn() {
    return !this.helper.isTokenExpired();
  }

  adminLoggedIn() {
    if (!this.helper.isTokenExpired()) {
      const aUser = localStorage.getItem('user');
      if (aUser === null) {
        return false;
      }
      this.user = JSON.parse(aUser);

      if (this.user.permission === 'admin') {
        return true;
      } else {
        return false;
      }
    }
  }


  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
