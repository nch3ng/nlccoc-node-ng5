import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScriptLoaderService } from './../../../../../_services/script-loader.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { User } from '../../../../../auth/_models';
import { UserService } from '../../../../../auth/_services';
import { NgForm } from '@angular/forms';

import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-header-profile",
  templateUrl: "./header-profile.component.html", 
  encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit, AfterViewInit {

  user: User = new User();
  saving: boolean = false;

  constructor(private userService: UserService, private toastrService: ToastrService) {
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
    this.toastrService.success("Hello World!", "Toastr fun!");
    this.userService.update(this.user).subscribe(
      (user:User) => {
        this.user = user;
      },
      (error) => {}
    )
  }

  ngAfterViewInit(){

  }

}
