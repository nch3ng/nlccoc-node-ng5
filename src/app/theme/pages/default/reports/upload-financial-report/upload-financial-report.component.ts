import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../../../auth/_services/user.service';
import { ReportService } from './../../../../../_services/report.service';
import { PagesService } from './../../../../../_services/pages.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ConfirmService } from './../../../../../_services/confirm.service';
import { Component, OnInit, ViewEncapsulation, EventEmitter, OnDestroy, Output, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Report } from '../../../../../_models/report';
import swal from 'sweetalert2';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-financial-report.component.html',
  styleUrls: ['./upload-financial-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFinancialReportComponent implements OnInit, OnDestroy, AfterViewInit{

  isActive: boolean = false;
  selectedFilename: string = 'or drag and drop files here';
  selectedFile = null;
  uploadedProgress: number = 0;
  uploadSub: Subscription;
  fReport: Report; 
  mode: string = 'new';
  uploading: boolean = false;

  months = [
    {id: 1, name: 'January'},
    {id: 2, name: 'February'},
    {id: 3, name: 'March'},
    {id: 4, name: 'April'},
    {id: 5, name: 'May'},
    {id: 6, name: 'June'},
    {id: 7, name: 'July'},
    {id: 8, name: 'Auguest'},
    {id: 9, name: 'September'},
    {id: 10, name: 'Octobor'},
    {id: 11, name: 'November'},
    {id: 12, name: 'December'}
  ];
  selectedMonth: any;  

  @Output('uploadPage')
  uploadPage: EventEmitter<boolean> = new EventEmitter<boolean>()
  
  constructor(
    private confirmService: ConfirmService,
    private http: HttpClient,
    private toastrService: ToastrService,
    private pageService: PagesService,
    private reportService: ReportService, 
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router){ }

  ngOnInit() {
    
    this.fReport = new Report();
    this.fReport.uploadedBy = this.userService.currentUser();
    this.fReport.month = new Date().getMonth(); // Last month
    this.route.params.subscribe(
      (params) => {
        console.log(params);
        if(params['id']){
          this.mode="edit"
          this.reportService.getById(params['id']).subscribe(
            (report: Report) => {
              this.fReport = report;
            },
            (error) => {
              this.toastrService.error("Something went wrong", "Error" );
            }
          );
        }
      }
    );
  }

  ngAfterViewInit() {
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
    this.fReport.reset();
    this.fReport.uploadedBy = this.userService.currentUser();
    this.selectedFile = null;
    this.selectedFilename = 'or drag and drop files here';
    setTimeout(()=>{
      this.uploadedProgress = 0;
    }, 1000)
  }

  onAddReport(form){
    console.log(this.selectedFile);
    
    if(!this.selectedFile){
      this.confirmService.alert("Please select a file");
      return false;
    }

    this.uploading = true;
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
            
            this.fReport.path = event.body['url'];
            this.fReport.uploadedAt = Date.now();
            this.reportService.create(this.fReport).subscribe(
              (report: Report) => {
                this.toastrService.success("You successfuly uploaded financial report: [" + this.selectedFilename +"]", "Upload File");
                this.uploading = false;
                this.onReset();
                this.router.navigate(['/admin/reports']);
              },
              (error) => {
                this.uploading = false
                this.toastrService.error("Uploaded financial report [" + this.selectedFilename + "] fail", "Upload File" );
              }            
            )
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
