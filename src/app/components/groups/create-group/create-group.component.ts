import {  Component,  OnInit} from '@angular/core';
import {  Router} from '@angular/router';
import {  AuthService} from '../../../services/auth.service';
import { GroupService } from '../group-service.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;

  name: string;
  logo: any;
  constructor(private authService: AuthService,
              private router: Router,
              private groupService: GroupService ) {}

  ngOnInit() {}

  onCreateSubmit() {
    console.log(this.name);
    this.groupService.createNewGroup(this.name).subscribe(res => console.log(res));

  }


  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // tslint:disable-next-line:quotemark
      this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
