import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

import {User} from '../../Shared/user';
import { catchError } from 'rxjs/operators';

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


    // Register user
    this.authService.registerUser(user).then(data => {
      this.flashMessage.show('User successfully registered', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/login']);
            // if (data.success) {
      //   this.flashMessage.show('User successfully registered', { cssClass: 'alert-success', timeout: 3000 });
      //   this.router.navigate(['/login']);
      // } else {
      //   this.flashMessage.show('Could not register', { cssClass: 'alert-danger', timeout: 3000 });
      //   this.router.navigate(['/register']);

      // }
    }, error => {
      this.flashMessage.show('Could not register', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/register']);
    });
  }
}
