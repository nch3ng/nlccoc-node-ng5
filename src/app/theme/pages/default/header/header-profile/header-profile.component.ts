import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { User } from '../../../../../auth/_models';
import { UserService } from '../../../../../auth/_services';


@Component({
  selector: "app-header-profile",
  templateUrl: "./header-profile.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {

  private user: User;

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.user = this.userService.currentUser();
  }

}
