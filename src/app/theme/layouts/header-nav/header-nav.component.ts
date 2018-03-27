import { Avatar } from './../../../../../server/interfaces/avatar';
import { User } from './../../../auth/_models/user';
import { UserService } from './../../../auth/_services/user.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Message } from '../../../_models/message';

declare let mLayout: any;
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
  user: User;
  avatar: string;
  messages: Message [];
  constructor(private _userService: UserService) {
  }
  ngOnInit() {
    this.user = this._userService.currentUser();

    this.avatar = this.user.profile.fbAvatar.large.path;

    this._userService.getMessages().subscribe(
      (messages: Message []) => {
        this.messages = messages;
      },
      (err) => {
      }
    );
  }
  ngAfterViewInit() {

    mLayout.initHeader();



  }

}
