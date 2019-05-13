import {
  Injectable
} from '@angular/core';

// import { JwtHelperService } from '@auth0/angular-jwt';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri: string;

  authToken: any;
  user: any;

  userRole: string;

  constructor(private http: HttpClient) {
    this.loadToken();

    this.uri = 'https://bigtomato.herokuapp.com/';
  }

  async registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return await this.http.post < any > (this.uri + 'users/', user, httpOptions).pipe(
      tap((data: any) => {})
    ).toPromise();
  }

  async authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return await this.http.post < any > (this.uri + 'log_in/', user, httpOptions).pipe(
      tap((data: any) => {
        this.storeToken(data.token);
        this.loadToken();
        // console.log(data.token);
      })
    ).toPromise();
    // this.storeUserData(data.token, { name: data.name, email: data.email, username: data.username }));
  }

  profile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.authToken
      })
    };

    return this.http.get < any > (this.uri + 'users/', httpOptions).pipe(map(data => {
      this.user = {
        name: data.name,
        email: data.email,
        username: data.username
      };
      this.storeUserData(this.user);
      return this.user;
    }));

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