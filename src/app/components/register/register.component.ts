import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

import {User} from '../../Shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    console.log(user);


    // Required fields

    // if (!this.validateService.validateRegister(user)) {
    //   this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 5000 });
    //   return false;
    // }

    // validate email

    // if (!this.validateService.validateEmail(user.email)) {
    //   this.flashMessage.show('Please use valid email', { cssClass: 'alert-danger', timeout: 5000 });
    //   return;
    // }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('User successfully registered', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Could not register', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);

      }
    });
  }
}
