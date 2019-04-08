import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {User} from '../../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  user: User;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.user = {username: this.username, password: this.password};
    console.log(this.user);
  }
}
