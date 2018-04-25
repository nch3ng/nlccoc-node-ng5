import { LayoutModule } from './../../../layouts/layout.module';
import { DefaultComponent } from './../default.component';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: 'wait-for-approval',
        component: UsersComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule
  ], exports: [
    RouterModule
  ], declarations: [
    UsersComponent
  ]
})
export class UsersModule {
}
