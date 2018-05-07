import { ConfirmationComponent } from './auth/pages/confirmation/confirmation.component';
import { UnverifiedComponent } from './auth/pages/unverified/unverified.component';
import { ConfirmationFailedComponent } from './auth/pages/confirmation/confirmation-failed/confirmation-failed.component';
import { ConfirmationSuccessComponent } from './auth/pages/confirmation/confirmation-success/confirmation-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuard } from './auth/_guards';

const routes: Routes = [
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'logout', component: LogoutComponent },
  { path: 'confirmation-success', component: ConfirmationSuccessComponent },
  { path: 'confirmation-failed', component: ConfirmationFailedComponent },
  { path: 'confirmation/:cid', component: ConfirmationComponent },
  { path: ':userId/unverified', component: UnverifiedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
