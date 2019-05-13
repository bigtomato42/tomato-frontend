import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group-service.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {
  myGroups: any;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    //this.groupService.getMyGroups().subscribe(res => console.log(res));
    this.groupService.getMyGroups().subscribe(res => this.myGroups = res);
  }

}
