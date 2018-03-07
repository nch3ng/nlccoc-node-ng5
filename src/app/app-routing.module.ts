import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";
import { UnverifiedComponent } from './theme/pages/default/unverified/unverified.component';
import { AuthGuard } from './auth/_guards';

const routes: Routes = [
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'logout', component: LogoutComponent },
  { path: ':userId/unverified', component: UnverifiedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
