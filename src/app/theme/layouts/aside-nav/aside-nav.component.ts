import { PagesService } from './../../../_services/pages.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) {
    this.user = this.userService.currentUser();

    if(this.user.role === "admin")
      this.isAdmin=true;
  }
  ngOnInit() {
    
  }
  ngAfterViewInit() {

    mLayout.initAside();

  }

  onUploadPage(event){
    console.log("on upload page");
    console.log(event)
  }

}
