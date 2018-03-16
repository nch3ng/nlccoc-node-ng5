import { Avatar } from './../../../../../server/interfaces/avatar';
import { User } from './../../../auth/_models/user';
import { UserService } from './../../../auth/_services/user.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
  user: User;
  avatar: string;
  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.user = this.userService.currentUser();

    this.avatar = this.user.profile.fbAvatar.large.path;
  }
  ngAfterViewInit() {

    mLayout.initHeader();

  }

}
