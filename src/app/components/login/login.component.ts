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
    // this.authService.authenticateUser(user);

    // demo token
    // tslint:disable-next-line:max-line-length
    this.authService.storeToken('c13338db1ca87ed6865593f810578949cd9bd21e');
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
