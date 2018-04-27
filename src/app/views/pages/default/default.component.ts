import { PagesService } from './../../../_services/pages.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ScriptLoaderService } from '../../../_services/script-loader.service';


@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body",
  templateUrl: "./default.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {

  currentPage:string = "";
  isUpload: boolean = false;

  constructor(
    private pageService: PagesService) {
    this.pageService.currentPage.subscribe(
      (value) => {
        this.currentPage=value;
        if (this.currentPage === 'upload')
          this.isUpload=true
        else
          this.isUpload=false;
      })
  }
  ngOnInit() {

  }

}
