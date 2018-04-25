import { ReportService } from './../../../../_services/report.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LayoutModule } from './../../../layouts/layout.module';
import { DefaultComponent } from './../default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": UploadFileComponent
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
    ReactiveFormsModule
  ], exports: [
    RouterModule
  ], declarations: [
    UploadFileComponent
  ], providers: []
})
export class UploadModule {



}
