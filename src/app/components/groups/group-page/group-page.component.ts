import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  group: any;
  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.group = this.groupService.getGroupDetails(params.get('id'))
    )).subscribe(data => this.group = data);
    // this.groupService.getGroupDetails(id).subscribe(res => this.group = res);
  }

}
