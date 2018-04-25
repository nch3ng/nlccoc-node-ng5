import { Message } from './../../../../_models/message';
import { MessageService } from './../../../../_services/message.service';
import { Router } from '@angular/router';
import { User } from './../../../../auth/_models/user';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from './../../../../_services/confirm.service';
import { UserService } from './../../../../auth/_services/user.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {


  constructor(
    private _script: ScriptLoaderService,
    private _userService: UserService,
    private _confirmService: ConfirmService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _messageService: MessageService) {

  }
  ngOnInit() {
    // console.log(this._userService.currentUser());
  }
  ngAfterViewInit() {
    this._script.loadScripts('app-index',
      ['assets/app/js/dashboard.js']);

    if (!this._userService.currentUser().isNLCCSelected &&
        this._userService.currentUser().role.name !== 'admin' &&
        this._userService.currentUser().role.name !== 'nlccoc' &&
        this._userService.currentUser().isWaitingForApproval) {
      setTimeout( () => {
        this._confirmService.open('Are you a member of New Life Christian Center?').then(
          () => {
            this._userService.submitNLCCOC(this._userService.currentUser()['_id']).subscribe(
              () => {
                this._toastrService.success('Please wait for the approval', 'Update role');
              },
              (error) => {
                this._toastrService.error('Something went wrong!', 'Update role');
              }
            );
          }
        ).catch( () => {
          console.log('rejected');
        });
      }, 1000);
    } else if (this._userService.currentUser().role.name === 'admin') {
      this._userService.getWaitingUsers().subscribe(
        (users: User []) => {
          if (users && users.length > 0) {
            setTimeout( () => {
            this._confirmService.open('There\'re some users need to be approved, go to the page?').then(
              () => {
                this._router.navigate(['/admin/users/wait-for-approval']);
              }
            ).catch( () => {
              this._toastrService.success('You can do it next time', 'Approving users');
            });
          }, 1000);
            // this._toastrService.success('Fake one', 'Goto page');
          }
        },
        (err) => {
          this._toastrService.error('Getting waiting users failed!', 'Service Check');
        }
      );
    }

    this._userService.getMessages().subscribe(
      (messages: Message []) => {
        console.log(messages);
      },
      (err) => {
      }
    );

    // this._messageService.sendAlert('SendAlert API test').subscribe(
    //   () => {
    //     this._toastrService.success('Test', 'Test');
    //   },
    //   (err) => {
    //     this._toastrService.error('Test', 'Test');
    //   }
    // );
    // const msg: Message = {
    //   message: 'AAAAAAAAAAAA',
    //   from: null,
    //   to: null,
    //   sentAt: Date.now(),
    //   read: false
    // };

    // this._messageService.createForAll(msg).subscribe(
    //   (res) => {
    //     this._toastrService.success('Test', 'Test');
    //   },
    //   (err) => {
    //     this._toastrService.error('Test', 'Test');
    //   }
    // );
    // this._messageService.create(msg).subscribe(
    //   () => {
    //     this._toastrService.success('Test', 'Test');
    //   },
    //   (err) => {
    //     this._toastrService.error('Test', 'Test');
    //   }
    // );
  }

}
