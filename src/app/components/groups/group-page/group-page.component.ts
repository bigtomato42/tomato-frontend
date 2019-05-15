import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { GroupsService } from '../../../services/groups.service';

import { Event } from '../../../shared/model/event';
import { Message } from '../../../shared/model/message';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  group: any;
  username: any;
  timeLeft = 60;
  interval;
  subscribeTimer: any;

  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  ioConnection2: any;

  constructor(
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private socketService: SocketService) { }

  async ngOnInit() {
    this.username = this.authService.getUsername();
    await this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.group = this.groupService.getGroupDetails(params.get('id'))
      )).subscribe(data => {
        this.group = data;
        this.initIoConnection();

      }
      );
    // this.groupService.getGroupDetails(id).subscribe(res => this.group = res);


  }


  // timer
  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  // socket connection
  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent(Event.CONNECT, { room: this.group.id, user: this.username })
      .subscribe(() => {
        console.log('connected');
      });

    this.ioConnection2 = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
        console.log(message);
      });

    this.ioConnection = this.socketService.onStatusUpdate()
      .subscribe((data) => {
        console.log(data)
        const theUser = this.group.users.find(user => user.username === data.username);

        if (theUser != null) {
          const index = this.group.users.indexOf(theUser);
          this.group.users[index].status = data.info;
          console.log(theUser);
        }
      });

    this.socketService.onEvent(Event.DISCONNECT, { room: this.group.id, user: this.username })
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.username,
      content: message
    }, this.group.id);
    this.messageContent = null;
  }

  // public sendNotification(params: any, action: Action): void {
  //   let message: Message;

  //   if (action === Action.JOINED) {
  //     message = {
  //       from: this.user,
  //       action
  //     };
  //   } else if (action === Action.RENAME) {
  //     message = {
  //       action,
  //       content: {
  //         username: this.user.name,
  //         previousUsername: params.previousUsername
  //       }
  //     };
  //   }

  //   this.socketService.send(message);
  // }
}
