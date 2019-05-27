import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class GroupsService {
  groupConfigUrl = 'https://bigtomato.herokuapp.com/groups/';
  taskConfigUrl = 'https://bigtomato.herokuapp.com/tasks/';
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
    return this.http.get(this.groupConfigUrl, this.httpOptions);
  }
  getGroupDetails(id: string) {
    return this.http.get(this.groupConfigUrl + id, this.httpOptions);
  }

  createNewGroup(name: string) {
    return this.http.post(this.groupConfigUrl, { name }, this.httpOptions);
  }

  inviteUser(username: string, groupId) {
    return this.http.post(this.groupConfigUrl + groupId + '/invite_users/', { users: username }, this.httpOptions);
  }

  getTasks(groupId) {
    return this.http.get(this.taskConfigUrl + `?group=${groupId}`, this.httpOptions);
  }

  createTask(group, name) {
    return this.http.post(this.taskConfigUrl, { group, name }, this.httpOptions);

  }
  finishTask(id) {
    return this.http.patch(this.taskConfigUrl + `${id}/`, { finished: true }, this.httpOptions);

  }

  deleteTask(id) {
    return this.http.delete(this.taskConfigUrl + `${id}/`, this.httpOptions);
  }
}
