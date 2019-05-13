import { Injectable } from '@angular/core';

// import { JwtHelperService } from '@auth0/angular-jwt';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri: string;

  authToken: any;
  user: any;

  userRole: string;

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // this.storeToken(this.authToken);

    this.loadToken();

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    if (this.loggedIn()) {
      this.headers.append('Authorization', 'Token' + this.authToken);
    }
    this.uri = 'https://bigtomato.herokuapp.com/';
    // this.localhost = '';
  }

  registerUser(user) {
    console.log(user);
    return this.http.get<any>(this.uri);
  }

  authenticateUser(user) {
    return this.http.post<any>(this.uri, user).subscribe(data => {
      this.storeToken(data.token);
      return true;
    } ,
      () => false            );
      // this.storeUserData(data.token, { name: data.name, email: data.email, username: data.username }));

  }

   storeToken(token) {
     if (token == null)    {
      throw error('Token is null');
    }
     localStorage.setItem('access_token', token);
     this.authToken = token;
   }

  // storeUserData(token, user) {
  //   localStorage.setItem('access_token', token);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.authToken = token;
  //   this.user = user;
  // }

  loadToken() {
    const token = localStorage.getItem('access_token');
    this.authToken = token;
  }


  loggedIn() {
    return !(this.authToken == null);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
