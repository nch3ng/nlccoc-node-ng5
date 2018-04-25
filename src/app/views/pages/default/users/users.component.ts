import { ConfirmService } from './../../../../_services/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../../../auth/_services/user.service';
import { User } from './../../../../auth/_models/user';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: Observable<User []> | User [];
  url;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _toastrService: ToastrService,
    private _router: Router,
    private _confirmService: ConfirmService) { }

  ngOnInit() {
    this._route.url.subscribe(
      (url) => {
        this.url = url;
      },
      (err) => {
      }
    );

    this.getUsers();
  }

  getUsers() {
    let func = 'getAll';
    if (this.url.length > 0 && this.url[0].path === 'wait-for-approval') {
      func = 'getWaitingUsers';
    }
    this._userService[func]().subscribe(
      data => {
        this.users = data;
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit() {
    // $('#m_form_status, #m_form_type').selectpicker();
    // logger.debug(this.users);
  }

  onDelete(user: User) {
    this._confirmService.open('Delete [' + user.firstName + ' ' + user.lastName + ']?').then(
      () => {
        this._userService.delete(user['_id']).subscribe(
          (result_user: User) => {
            this._toastrService.success('Successfully deleted: [' + user.firstName + ' ' + user.lastName + '].', 'Delete user');
            this.getUsers();
          },
          (err) => {
            this._toastrService.error('Opps, something went wrong!', 'Delete user');
          }
        );
      }).catch( () => {
        // Reject
      });
  }
  onApprove(user: User) {

    this._confirmService.open('Approve it?').then(
      () => {
        this._userService.approve(user['_id']).subscribe(
          (ruser: User) => {
            this._toastrService.success('Successfully approved: [' + user.firstName + ' ' + user.lastName + '].', 'Approve user');
            this.getUsers();
          },
          (err) => {
            this._toastrService.error('Opps, something went wrong!', 'Approve user');
          }
        );
      }
    ).catch( () => {
      this._toastrService.success('You can do it next time', 'Approving users');
    });
  }
}
