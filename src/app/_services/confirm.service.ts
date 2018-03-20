import { Injectable } from "@angular/core";
import { Modal as NgxModal, TwoButtonPreset, TwoButtonPresetBuilder, bootstrap4Mode, OneButtonPresetBuilder, OneButtonPreset} from "ngx-modialog/plugins/bootstrap";
import { DialogRef } from "ngx-modialog";

@Injectable()
export class ConfirmService {

  private preset: TwoButtonPreset = <any>{
    size: '',
    isBlocking: true,
    showClose: true,
    keyboard: 27,
    dialogClass: '',
    headerClass: '',
    titleHtml: '',
    body: 'Do you want to proceed?',
    bodyClass: '',
    footerClass: 'modal-footer custom-modal-footer',
    okBtn: 'Yes',
    okBtnClass: '',
    cancelBtn: 'No',
    cancelBtnClass:'btn btn-danger'
  };

  constructor(
    private ngxModal: NgxModal){
    bootstrap4Mode();

  }

  open(): Promise<Boolean>{
    let fluent: TwoButtonPresetBuilder = <any>this.ngxModal['confirm']();

    for (let key in this.preset) {
      let value = this.preset[key];
      if (value === null || value === '') continue;
      fluent[key](value);
    }
    const dialogRef: DialogRef<TwoButtonPreset> = fluent.showClose(true)
        .body(`Do you want to proceed?`)
        .open();


    return new Promise(
      (resolve, reject) => {
        dialogRef.result
        .then( (result) => 
          { 
            // console.log(`The result is: ${result}`);
            resolve(true);
          })
        .catch( () => {
          reject(false);
        });
      }
    )
  }

  alert(msg) {
    let fluent: OneButtonPresetBuilder = <any>this.ngxModal['alert']();

    // for (let key in this.preset) {
    //   let value = this.preset[key];
    //   if (value === null || value === '') continue;
    //   fluent[key](value);
    // }
    const dialogRef: DialogRef<OneButtonPreset> = fluent
      .isBlocking(false)
      .showClose(true)
      .body(msg)
      .open();
  }
}