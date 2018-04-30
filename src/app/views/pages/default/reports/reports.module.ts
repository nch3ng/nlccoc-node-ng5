import { ReportService } from './../../../../_services/report.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LayoutModule } from './../../../layouts/layout.module';
import { DefaultComponent } from './../default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UploadFinancialReportComponent } from './upload-financial-report/upload-financial-report.component';
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': '',
        'component':  FinancialReportComponent
      },
      {
        'path': 'financial-report/create',
        'component': UploadFinancialReportComponent
      },
      {
        'path': 'financial-report/edit/:id',
        'component': UploadFinancialReportComponent
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
    SweetAlert2Module
  ], exports: [
    RouterModule
  ], declarations: [
    FinancialReportComponent,
    UploadFinancialReportComponent
  ], providers: [ReportService]
})
export class ReportsModule {



}
