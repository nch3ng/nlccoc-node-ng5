import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScriptLoaderService } from './../../../../../_services/script-loader.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { User } from '../../../../../auth/_models';
import { UserService } from '../../../../../auth/_services';
import { NgForm } from '@angular/forms';

import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';

import { Overlay as NgxOverlay, DialogRef } from 'ngx-modialog';
import { Modal as NgxModal, bootstrap4Mode, TwoButtonPreset, TwoButtonPresetBuilder } from 'ngx-modialog/plugins/bootstrap';
import { ConfirmService } from '../../../../../_services/confirm.service';

@Component({
  selector: "app-header-profile",
  templateUrl: "./header-profile.component.html", 
  styles:[
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit, AfterViewInit {

  user: User = new User();
  saving: boolean = false;

  // private preset: TwoButtonPreset = <any>{
  //   size: 'lg',
  //   isBlocking: true,
  //   showClose: true,
  //   keyboard: 27,
  //   dialogClass: '',
  //   headerClass: '',
  //   titleHtml: '',
  //   body: 'A Customized Modal',
  //   bodyClass: '',
  //   footerClass: 'modal-footer custom-modal-footer',
  //   okBtn: 'Yes',
  //   okBtnClass: '',
  //   cancelBtn: 'No',
  //   cancelBtnClass:'btn btn-danger'
  // };

  constructor(
    private userService: UserService, 
    private toastrService: ToastrService,
    private confirmService: ConfirmService
    // private ngxModal: NgxModal
  ) {
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

    this.confirmService.open().then(
      (value) => {
        this.userService.update(this.user).subscribe(
          (user:User) => {
            this.user = user;
            this.toastrService.success("You successfully updated your profile", "Updated profile");
          },
          (error) => {
            this.toastrService.error("Updated profile", "Updated profile failed please try again later");
          }
        )
      }
    ).catch( () => {
      console.log("rejected");
    })
  
    
  }

  ngAfterViewInit(){

  }

}
