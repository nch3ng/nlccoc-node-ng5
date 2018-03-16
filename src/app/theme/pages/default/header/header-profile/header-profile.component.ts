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

  user: User = new User();
  saving: boolean = false;

  constructor(private userService: UserService) {
    let id = this.userService.currentUser()['_id'];
    this.userService.getById(id).subscribe(
      (user:User) => {
        this.user = user
      },
      (error) => {}
    );
  }
  ngOnInit() {
  }

  onUpdate(form: NgForm) {
    this.userService.update(this.user).subscribe(
      (user:User) => {
        this.user = user;
      },
      (error) => {}
    )
  }

}
