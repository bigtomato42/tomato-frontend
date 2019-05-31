import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
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
export class GroupPageComponent implements OnInit, OnDestroy {

  group: any;
  username: any;
  tasks: any;
  groupOwner = false;
  inviteUser: string;

  taskName: string;

  minsLeft;
  secsLeft;
  interval;
  timerRunning = false;
  currentPattern;
  currentMode;
  boolWorkMode;
  patternWorkMins;
  patternBreakMins;

  messages: Message[] = [];
  messageContent: string;

  ioConnection: any;
  ioConnection2: any;

  private routeSub: any;  // subscription to route observer

  constructor(
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private socketService: SocketService) {

    this.minsLeft;
    this.secsLeft = 0;

  }

  async ngOnInit() {
    // current user
    this.username = this.authService.getUsername();

    // get group details
    await this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.group = this.groupService.getGroupDetails(params.get('id'))
      )).subscribe(data => {
        this.group = data;
        if (this.group.owner.username === this.username) { this.groupOwner = true; }

        // get tasks
        this.groupService.getTasks(this.group.id).subscribe(res => {
          this.tasks = res;
        });
        // initialize socket
        this.initIoConnection();
      }
      );

    this.patternWorkMins = 5;
    this.patternBreakMins = 1;

    this.minsLeft = this.patternWorkMins;
    this.currentMode = 'Work';
    this.boolWorkMode = true;
    this.currentPattern = `Work: ${this.patternWorkMins} min, Break: ${this.patternBreakMins} min`;

    // on exit component
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.disconnectUser();
      }
    });
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  // get tasks
  getTasks() {
    this.groupService.getTasks(this.group.id).subscribe(res => {
      this.tasks = res;
    });
  }
  // invite users
  onInviteUser() {
    this.groupService.inviteUser(this.inviteUser, this.group.id).subscribe(res => console.log(res));
    this.inviteUser = '';

  }

  // create task
  onTaskCreate() {
    this.groupService.createTask(this.group.id, this.taskName).subscribe(res => {
      this.getTasks();
      this.taskName = '';
    });
  }

  // task finished
  onTaskFinished(id) {
    this.groupService.finishTask(id).subscribe(res => this.getTasks());
  }
  // del task
  onTaskDelete(id) {
    this.groupService.deleteTask(id).subscribe(res => this.getTasks());
  }

  // timer
  startTimer() {
    this.timerRunning = !this.timerRunning;
    if (this.timerRunning) {
      this.interval = setInterval(() => {
        if (this.secsLeft > 0) {
          this.secsLeft--;
        } else {
          if (this.minsLeft === 0) {
            if (this.boolWorkMode) {
              this.minsLeft = this.patternBreakMins;
              this.currentMode = 'Break';
            } else {
              this.minsLeft = this.patternWorkMins;
              this.currentMode = "Work";
            }
            this.boolWorkMode = !this.boolWorkMode;

            // this.pauseTimer();
          } else {
            this.secsLeft = 59;
            this.minsLeft--;
          }
        }
      }, 1000);
    }
  }

  pauseTimer() {
    this.timerRunning = !this.timerRunning;
    clearInterval(this.interval);
  }

  resetTimer() {
    this.pauseTimer();
    this.minsLeft = this.patternWorkMins;
    this.secsLeft = 0;
    this.timerRunning = false;
  }

  setTimerPattern(workMins, breakMins) {
    this.patternWorkMins = workMins;
    this.patternBreakMins = breakMins;
    this.currentPattern = `Work: ${this.patternWorkMins} min, Break: ${this.patternBreakMins} min`;
    this.resetTimer();
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
        // console.log(data)
        const theUser = this.group.users.find(user => user.username === data.username);

        if (theUser != null) {
          const index = this.group.users.indexOf(theUser);
          this.group.users[index].status = data.status;
          // console.log(theUser);
        }
      });

    this.ioConnection = this.socketService.onGetUsers()
      .subscribe((data) => {
        data.forEach(user => {
          const theUser = this.group.users.find(u => u.username === user.username);

          if (theUser != null) {
            const index = this.group.users.indexOf(theUser);
            this.group.users[index].status = user.status;
          }
        });
      });
  }

  // send message 
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


  public disconnectUser(): void {
    this.socketService.disconnectUser();
    console.log('disconnected');
  }

}
