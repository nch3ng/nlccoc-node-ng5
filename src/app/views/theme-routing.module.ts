import { UploadFileComponent } from './pages/default/upload/upload-file/upload-file.component';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        'path': 'index',
        'loadChildren': '.\/pages\/default\/index\/index.module#IndexModule'
      },
      {
        'path': 'header\/profile',
        'loadChildren': '.\/pages\/default\/header\/header-profile\/header-profile.module#HeaderProfileModule'
      },
      {
        'path': 'admin\/users',
        'loadChildren': '.\/pages\/default\/users\/users.module#UsersModule',
        data: { roles: ['admin'] }
      },
      {
        'path': 'admin\/upload',
        'loadChildren': '.\/pages\/default\/upload\/upload.module#UploadModule',
        data: { roles: ['admin'] }
      },
      {
        'path': 'admin\/reports',
        'loadChildren': '.\/pages\/default\/reports\/reports.module#ReportsModule',
        data: { roles: ['admin'] }
      },
      {
        'path': 'admin\/income',
        'loadChildren': '.\/pages\/default\/income\/income.module#IncomeModule',
        data: { roles: ['admin'] }
      },
      {
        'path': '404',
        'loadChildren': '.\/pages\/default\/not-found\/not-found.module#NotFoundModule'
      },
      {
        'path': '',
        'redirectTo': 'index',
        'pathMatch': 'full'
      }
    ]
  },
  {
    'path': '**',
    'redirectTo': '404',
    'pathMatch': 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
