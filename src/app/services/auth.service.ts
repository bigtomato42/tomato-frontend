import {  Injectable} from '@angular/core';

// import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, tap} from 'rxjs/operators';

import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  uri: string;

  authToken: any;
  user: any;

  userRole: string;

  httpOptions = {};

  constructor(private http: HttpClient) {
    this.uri = 'https://bigtomato.herokuapp.com/';

    this.loadToken();

    if (this.loggedIn()) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.authToken
        })
      };
    }
  }

  async registerUser(user) {
    return await this.http.post < any > (this.uri + 'users/', user).pipe(
      tap((data: any) => {})
    ).toPromise();
  }

  async authenticateUser(user) {
    return await this.http.post<any>(this.uri + 'log_in/', user).pipe(
      map(data => {
        this.storeToken(data.token);
        this.loadToken();
        return { success: this.loggedIn() };
        // console.log(data.token);
      },
      error => {})
    ).toPromise();
    // this.storeUserData(data.token, { name: data.name, email: data.email, username: data.username }));
  }

  async profile() {
    return await this.http.get < any > (this.uri + 'users/', this.httpOptions).pipe(map(data => {
      this.user = {
        name: data.name,
        email: data.email,
        username: data.username
      };
      this.storeUserData(this.user);
      return this.user;
    }, error => { })).toPromise();

  }

  storeToken(token) {
    localStorage.setItem('access_token', token);
    this.authToken = token;
  }

  storeUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

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
