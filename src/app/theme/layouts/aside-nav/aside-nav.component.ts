import { PagesService } from './../../../_services/pages.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { User } from '../../../auth/_models';
import { UserService } from '../../../auth/_services';

declare let mLayout: any;
@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

  isAdmin: boolean;
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) {
      this.isAdmin = false;
      this.user = this.userService.currentUser();

      if (this.user.role.name === 'admin') {
        this.isAdmin = true;
      }
  }
  ngOnInit() {
  }
  ngAfterViewInit() {

    mLayout.initAside();

  }

  onUploadPage(event) {
    console.log('on upload page');
    console.log(event);
  }

}
