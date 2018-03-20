import { PagesService } from './../../../../../_services/pages.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ConfirmService } from './../../../../../_services/confirm.service';
import { Component, OnInit, ViewEncapsulation, EventEmitter, OnDestroy, Output, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFileComponent implements OnInit, OnDestroy, AfterViewInit{

  isActive: boolean = false;
  selectedFilename: string = 'or drag and drop files here';
  selectedFile = null;
  uploadedProgress: number = 0;
  uploadSub: Subscription;

  @Output('uploadPage')
  uploadPage: EventEmitter<boolean> = new EventEmitter<boolean>()
  
  constructor(
    private confirmService: ConfirmService,
    private http: HttpClient,
    private toastrService: ToastrService,
    private pageService: PagesService){ }

  ngOnInit() {
    console.log("should emit");
  }

  ngAfterViewInit() {
    console.log("after view init"
    );
    setTimeout(()=>this.pageService.setCurrentPage("upload"))
    
  }

  onSelectFile(event){
    this.selectedFile = event.target.files[0];
    this.selectedFilename = this.selectedFile.name;
  }

  onDragenter(event) {
    this.isActive = true;
  }
  onDragout(event) {
    this.isActive = false;
  }

  onMouseenter(event) {
    this.isActive = true;
  }
  onMouseleave(event) {
    this.isActive = false;
  }

  onDrop(event) {
   
  }

  onReset() {
    this.uploadedProgress = 0;
    this.selectedFile = null;
    this.selectedFilename = 'or drag and drop files here';
  }

  onUpload(){
    console.log(this.selectedFile);
    
    if(!this.selectedFile){
      this.confirmService.alert("Please select a file");
      return false;
    }

    const fd = new FormData();

    fd.append('image', this.selectedFile, this.selectedFilename);
    
    this.uploadSub = this.http.post('/api/files/upload', fd, {
      reportProgress: true, observe: 'events'
    }).subscribe( 
      (event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadedProgress = Math.round(event.loaded/event.total * 100.00);
            break;
          case HttpEventType.Response:
            this.toastrService.success("You successfuly uploaded file: [" + this.selectedFilename +"]", "Upload File");
            break;
        }
      },
      (error) => {
        this.toastrService.error("Uploaded file [" + this.selectedFilename + "] fail", "Upload File" );
      }
    )
  }

  onStop(){
    this.uploadSub.unsubscribe();
    this.toastrService.success("Uploading stopped", "Upload File");
  }

  ngOnDestroy(){
    this.uploadPage.emit(false);
    this.pageService.setCurrentPage("");
  }
}
