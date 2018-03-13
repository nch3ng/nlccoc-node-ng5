import { Observable } from 'rxjs';
import { UserService } from './../../../../auth/_services/user.service';
import { User } from './../../../../auth/_models/user';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: Observable<User []> | User [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        data.forEach((user)=>{
          console.log(user);
          console.log("######");
        })
        console.log(data);
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
