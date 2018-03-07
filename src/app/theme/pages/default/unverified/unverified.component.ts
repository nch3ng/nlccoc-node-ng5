import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../auth/_services';

@Component({
  selector: 'app-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss']
})
export class UnverifiedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthenticationService, 
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    //console.log("Get the unverified page of " + this.route.snapshot.paramMap.get('userId'));
  }

  goToLogin() {
    this.authService.logout();
    this.router.navigate(["/index"]);
  }

  sendVerificationEmail(){
    this.userService.sendVerificationEmail().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {}
    );
  }

}
