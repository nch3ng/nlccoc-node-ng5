import { ActivatedRoute } from '@angular/router';
import { ResponseMessage } from './../../../../../../../server/models/reponse-message';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../../_services/report.service';
import { Report } from '../../../../../_models/report';
import swal from 'sweetalert2'
import { ConfirmService } from '../../../../../_services/confirm.service';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {

  reports: Report [] = [];
  constructor(
    private reportService: ReportService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit() {
    this.reportService.getAll().subscribe(
      (reports: Report []) => {
        this.reports = reports.slice();
      }
    );
  }

  onClick(){
    swal('Good job!','You clicked the button!', 'success');
  }

  onDelete(report) {
    this.confirmService.open().then(
      (value) => {
        this.reportService.delete(report['_id']).subscribe(
          (responseMessage: ResponseMessage) => {
            let index = this.reports.indexOf(report, 0);
            if (index > -1) {
              this.reports.splice(index, 1);
           }
            swal('Good job!','You deleted the report!', 'success');
          },
          (error) => {
            swal('Oops...', 'Something went wrong!', 'error');
          }
        );
      }
    ).catch( () => {
      
    })
  }
}
