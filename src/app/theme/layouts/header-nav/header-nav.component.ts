import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from './../../../_services/confirm.service';
import { MessageService } from './../../../_services/message.service';
import { Avatar } from './../../../../../server/interfaces/avatar';
import { User } from './../../../auth/_models/user';
import { UserService } from './../../../auth/_services/user.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Message } from '../../../_models/message';

declare let mLayout: any;
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit, OnDestroy {
  user: User;
  avatar: string;
  messages: Message [];
  newMessage: boolean;
  dot: boolean;
  newMessageCount: number;
  blink;
  isAdmin: boolean;
  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _confirmService: ConfirmService,
    private _toastrService: ToastrService) {

      this.isAdmin = false;
      this.user = this._userService.currentUser();

      if (this.user.role.name === 'admin') {
        this.isAdmin = true;
      }
  }
  ngOnInit() {
    this.newMessage = false;
    this.dot = false;
    this.newMessageCount = 0;
    this.user = this._userService.currentUser();
    this.avatar = this.user.profile.fbAvatar.large.path;
    this._userService.getMessages().subscribe(
      (messages: Message []) => {
        this.messages = messages;

        for (const msg of messages) {
          if (!msg.read) {
            this.newMessage = true;
            this.dot = true;
            this.newMessageCount ++;
          }
        }

        if (this.newMessage) {
          this.blink = setInterval(() => {
            this.newMessage = !this.newMessage;
          }, 3000);
        }
      },
      (err) => {
      }
    );
  }
  ngAfterViewInit() {
    mLayout.initHeader();
  }
  ngOnDestroy() {
    clearInterval(this.blink);
  }

  readMessage() {
    for ( const msg of this.messages) {
      if (!msg.read) {
        this._messageService.read(msg['_id']).subscribe(
          (message) => {
          },
          (err) => {
          }
        );
      }
    }
    this.dot = false;
    this.newMessage = false;
    this.newMessageCount = 0;
    clearInterval(this.blink);
  }
  onDeleteAlert(msg: Message) {
    this._confirmService.open('Do you want to delete it?').then(
      (value) => {
        this._messageService.delete(msg['_id']).subscribe(
          (message: Message) => {
            this._toastrService.success('Successfully deleted alert', 'Delete alert');
            this._userService.getMessages().subscribe(
              (messages: Message []) => {
                this.messages = messages;
              },
              (err) => {
              }
            );
          },
          (err) => {
            this._toastrService.error('Opps, something went wrong', 'Delete alert');
          }
        );
      }
    ).catch( () => {
    });
  }

}
