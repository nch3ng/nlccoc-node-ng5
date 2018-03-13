import { Router } from '@angular/router';
import { AuthenticationService } from './../../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-success',
  templateUrl: './confirmation-success.component.html',
  styleUrls: ['./confirmation-success.component.scss']
})
export class ConfirmationSuccessComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.authService.logout();
    this.router.navigate(["/index"]);
  }

}
