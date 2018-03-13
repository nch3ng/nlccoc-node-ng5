import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, AfterViewInit, OnDestroy {
  private sub: Subscription;
  private uid_sub: Subscription;
  uid: string;
  cid: string;
  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.cid = params['cid'];
      }
    );
    this.uid_sub = this.route.queryParams.subscribe(
      params => {
        this.uid = params['uid'];
      }
    )
  }

  ngAfterViewInit(){
    this.authService.verifyEmail(this.cid, this.uid).subscribe(
      data => {
        if(data.success)
          this.router.navigate(['/confirmation-success']);
        else{
          this.router.navigate(['/confirmation-failed', {msg:data.message}]);
        }
      },
      error => {
        this.router.navigate(['/confirmation-failed']);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
