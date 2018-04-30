import { IncomeService } from './../../../../_services/income.service';
import { IncomeNewComponent } from './income-new/income.new.component';
import { IncomeComponent } from './income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LayoutModule } from './../../../layouts/layout.module';
import { DefaultComponent } from './../default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: IncomeComponent
      },
      {
        path: 'new',
        component: IncomeNewComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SweetAlert2Module,
    NgbModule.forRoot()
  ], exports: [
    RouterModule
  ], declarations: [
    IncomeComponent,
    IncomeNewComponent
  ], providers: [IncomeService]
})
export class IncomeModule {
}
