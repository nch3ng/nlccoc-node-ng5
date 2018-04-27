import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { AlertComponent } from './_directives/alert.component';
import { LoginCustom } from './_helpers/login-custom';
import { Helpers } from '../helpers';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import secrets from '../../secrets';
import { User } from './_models';
import { isDevMode } from '@angular/core';

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './pages/login.component.html',
  providers: [FacebookService],
  encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit {
  model: any = {};
  loading: boolean;
  facebookLoading: boolean;
  returnUrl: string;

  @ViewChild('alertSignin',
    { read: ViewContainerRef }) alertSignin: ViewContainerRef;
  @ViewChild('alertSignup',
    { read: ViewContainerRef }) alertSignup: ViewContainerRef;
  @ViewChild('alertForgotPass',
    { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

  constructor(
    private _router: Router,
    private _script: ScriptLoaderService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _authService: AuthenticationService,
    private _alertService: AlertService,
    private cfr: ComponentFactoryResolver,
    private fbService: FacebookService) {
      this.loading = false;
      this.facebookLoading = false;
      let appId;
      if (isDevMode()) {
        appId = secrets.facebookAppDevId;
      } else {
        appId = secrets.facebookAppId;
      }
      const initParams: InitParams = {
        appId: appId,
        xfbml: true,
        version: 'v2.12'
      };
      fbService.init(initParams);
  }

  ngOnInit() {

    this.model.remember = true;
    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigate([this.returnUrl]);

    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/layouts/base/scripts.bundle.js'], true).then(() => {
        Helpers.setLoading(false);
        LoginCustom.init();
      });
  }

  signin() {
    this.loading = true;
    this._authService.login(this.model.email, this.model.password).subscribe(
      (user: User) => {
        console.log('login successful');
        console.log(user);
        if (!user.isVerified) {
          this._router.navigate(['/' + user['_id'] + '/unverified']);
        } else {
          console.log(this.returnUrl);
          this._router.navigate([this.returnUrl]);
        }
      },
      error => {
        // console.log(error.json());
        this.showAlert('alertSignin');
        this._alertService.error('Email or password is not correct');
        this.loading = false;
      });
  }

  signup() {
    this.loading = true;
    this._userService.create(this.model).subscribe(
      data => {
        this.showAlert('alertSignin');
        this._alertService.success(
          'Thank you. To complete your registration please check your email.',
          true);
        this.loading = false;
        LoginCustom.displaySignInForm();
        this.model = {};
      },
      error => {
        this.showAlert('alertSignup');
        this._alertService.error(error);
        this.loading = false;
      });
  }

  forgotPass() {
    this.loading = true;
    this._userService.forgotPassword(this.model.email).subscribe(
      data => {
        this.showAlert('alertSignin');
        this._alertService.success(
          'Cool! Password recovery instruction has been sent to your email.',
          true);
        this.loading = false;
        LoginCustom.displaySignInForm();
        this.model = {};
      },
      error => {
        this.showAlert('alertForgotPass');
        this._alertService.error(error);
        this.loading = false;
      });
  }

  showAlert(target) {
    this[target].clear();
    const factory = this.cfr.resolveComponentFactory(AlertComponent);
    const ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

  loginWithFacebook(): void {
    console.log('login with facebook');
    this.facebookLoading = true;
    const options: LoginOptions = {
      scope: 'email,public_profile',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fbService.login(options)
      .then(
        (response: LoginResponse) => {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire

            const user = new User();
            const uid = response.authResponse.userID;
            const accessToken = response.authResponse.accessToken;

            user.profile.fbId = uid;
            user.profile.fbToken = accessToken;

            // console.log(response.status);
            // console.log(uid);
            // console.log(accessToken);
            this.fbService.api('/me?fields=id,name,email,first_name,last_name,picture.width(500).height(500),gender,locale,link,age_range,timezone,cover,updated_time,verified')
              .then(rresponse => {
                // console.log('Got response', response);

                user.email = rresponse['email'];
                user.profile.fbId = rresponse['id'];
                user.firstName = rresponse['first_name'];
                user.lastName = rresponse['last_name'];
                user.profile.fullName = rresponse['name'];
                user.profile.locale = rresponse['locale'];
                user.profile.fbLink = rresponse['link'];
                user.profile.gender = rresponse['gender'];
                user.profile.fbCover = rresponse['cover']['source'];
                user.profile.fbAvatar.large.height = rresponse['picture']['data']['height'];
                user.profile.fbAvatar.large.width =  rresponse['picture']['data']['width'];
                user.profile.fbAvatar.large.path = rresponse['picture']['data']['url'];

                this._authService.fbLogin(user).subscribe(
                  (ruser: User) => {
                    console.log('login successful');
                    console.log(this.returnUrl);
                    this._router.navigate([this.returnUrl]);
                  },
                  (error) => {
                    this.showAlert('alertSignin');
                    this._alertService.error('Facebook login failed');
                    this.loading = false;
                  }
                );

                this.facebookLoading = false;
              });
              this.fbService.api('/' + uid + '/picture?type=large')
              .then(rresponse => {
                // console.log('Got response', response);
              });
          }
        })
      .catch((error: any) => console.error(error));

  }
}
