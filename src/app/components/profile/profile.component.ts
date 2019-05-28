import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

import { AuthService } from '../../services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  myInvitations: any;

  constructor(
    private authService: AuthService,
    private groupService: GroupsService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.user = this.authService.profile().subscribe(data => {
      this.user = data;
    }, error => { });

    this.groupService.getMyInvitations().subscribe(res => this.myInvitations = res);

  }

  getInvitations() {
    this.groupService.getMyInvitations().subscribe(res => this.myInvitations = res);

  }
  onAcceptInvitation(id) {
    this.groupService.acceptInvitation(id, this.user.username).subscribe(res => this.getInvitations());

  }

}
