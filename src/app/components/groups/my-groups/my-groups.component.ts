import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {
  myGroups: any;

  constructor(private groupService: GroupsService) { }

  ngOnInit() {
    // this.groupService.getMyGroups().subscribe(res => console.log(res));
    this.groupService.getMyGroups().subscribe(res => this.myGroups = res);
  }

}
