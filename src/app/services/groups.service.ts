import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class GroupsService {
  configUrl = 'https://bigtomato.herokuapp.com/groups/';
  httpOptions = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getToken()
      })
    };
  }

  getMyGroups() {
    // delete this
    return this.http.get(this.configUrl, this.httpOptions);
  }
  getGroupDetails(id: string) {
    return this.http.get(this.configUrl + id, this.httpOptions);
  }

  createNewGroup(name: string) {
    return this.http.post(this.configUrl, { name }, this.httpOptions);
  }
}
