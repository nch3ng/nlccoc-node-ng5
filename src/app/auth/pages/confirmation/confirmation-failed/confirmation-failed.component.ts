import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-failed',
  templateUrl: './confirmation-failed.component.html',
  styleUrls: ['./confirmation-failed.component.scss']
})
export class ConfirmationFailedComponent implements OnInit {

  msg: string;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.msg = this.route.snapshot.params.get('msg');
    console.log(this.msg);
  }

  sendVerificationEmail() {
    this.userService.sendVerificationEmail().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {}
    );
  }

}
