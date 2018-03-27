import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { NgModule } from '@angular/core';
import { ConfirmService } from './confirm.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
  ],
  providers: [
    ConfirmService
  ],
  exports: []
})

export class NlccocServicesModule {

}
