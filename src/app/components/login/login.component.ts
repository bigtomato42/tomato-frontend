import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

import { AuthService } from '../../services/auth.service';

import {User} from '../../Shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }


  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    // demo token
    // tslint:disable-next-line:max-line-length
    this.authService.storeUserData('JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVhMmJkZGE5MzZjYWM1MjdiY2Y4MTk4NyIsIm5hbWUiOiJNdXNrYW4gU2hyZXN0aGEiLCJ1c2VybmFtZSI6Im11c2thbnN0aGEiLCJlbWFpbCI6InN0aGFtdXNrYW5Ab3V0bG9vay5jb20iLCJwaG9uZSI6OTE4NTg1NSwicGVybWlzc2lvbiI6ImFkbWluIn0sImlhdCI6MTU1NjU0NjE2OSwiZXhwIjoxNTU3MTUwOTY5fQ.4hhnfpvyc2aDzO3P2n5HD54xXO4o7GbEYoLRqdWgLzA'
    , 'User');
    this.router.navigate(['/']);
    this.flashMessage.show('Login Successful', { cssClass: 'alert-success', timeout: 5000 });

    // actual service
    // this.authService.authenticateUser(user).subscribe(data => {
    //   // console.log(data);
    //   if (data.success) {
    //     this.authService.storeUserData(data.token, data.user);
    //     this.flashMessage.show('Login Successful', { cssClass: 'alert-success', timeout: 5000 });
    //     this.router.navigate(['/profile']);
    //   } else {
    //     this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
    //     this.router.navigate(['/login']);
    //   }
    // });
  }
}
