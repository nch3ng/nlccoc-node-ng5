import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'ngx-moment';
import { IncomeResolver } from './income.resolver';
import { IncomeTypeResolver } from './../../../../_resolvers/income.type.resolver';
import { ZoneResolver } from './../../../../_resolvers/zone.resolver';
import { ZoneService } from './../../../../_services/zone.service';
import { IncomeService } from './../../../../_services/income.service';
import { IncomeNewComponent } from './income-new/income.new.component';
import { IncomeComponent } from './income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LayoutModule } from './../../../layouts/layout.module';
import { DefaultComponent } from './../default.component';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
        component: IncomeComponent,
        resolve: { incomes: IncomeResolver}
      },
      {
        path: 'new',
        component: IncomeNewComponent,
        resolve: { zones: ZoneResolver, types: IncomeTypeResolver}
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
    NgbModule.forRoot(),
    NgxDatatableModule,
    MomentModule,
    NgPipesModule
  ], exports: [
    RouterModule
  ], declarations: [
    IncomeComponent,
    IncomeNewComponent
  ], providers: [
    IncomeService,
    IncomeTypeResolver,
    IncomeResolver
  ]
})
export class IncomeModule {
}
