import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

import { AuthService } from '../../services/auth.service';

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

    // actual service
    this.authService.authenticateUser(user).then(data => {
      if (data.success) {
        this.flashMessage.show('Login Successful', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show('Login Failed', { cssClass: 'alert-danger', timeout: 5000 });
        // this.router.navigate(['/login']);
      }
    }, error => {
      this.flashMessage.show('Login Failed', { cssClass: 'alert-danger', timeout: 5000 });
      // this.router.navigate(['/login']);
    });
  }
}
