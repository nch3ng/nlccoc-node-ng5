import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { User } from '../../../auth/_models';
import { UserService } from '../../../auth/_services';

declare let mLayout: any;
@Component({
  selector: "app-aside-nav",
  templateUrl: "./aside-nav.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

  isAdmin: boolean = false;
  user: User;

  constructor(private userService: UserService) {
    this.user = this.userService.currentUser();

    if(this.user.role === "admin")
      this.isAdmin=true;
  }
  ngOnInit() {
    
  }
  ngAfterViewInit() {

    mLayout.initAside();

  }

}
