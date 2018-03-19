import { Observable } from 'rxjs';
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
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;   
      },
      error => console.log(error)
    )
  }

  ngAfterViewInit(){
    // $('#m_form_status, #m_form_type').selectpicker();
    //console.log(this.users);
  }

}