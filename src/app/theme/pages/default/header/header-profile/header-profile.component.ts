import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { User } from '../../../../../auth/_models';
import { UserService } from '../../../../../auth/_services';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-header-profile",
  templateUrl: "./header-profile.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.user = this.userService.currentUser();
    delete this.user['salt'];
    delete this.user['hash'];
    console.log(this.user);
  }

  onUpdate(form: NgForm) {
    console.log(this.user);
  }

}
