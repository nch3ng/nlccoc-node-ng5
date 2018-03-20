import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../../_services/report.service';
import { Report } from '../../../../../_models/report';
import swal from 'sweetalert2'

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {

  reports: Report [] = [];
  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getAll().subscribe(
      (reports: Report []) => {
        this.reports = reports.slice();
        console.log(this.reports);
      }
    );
  }

  onClick(){
    swal('Good job!','You clicked the button!', 'success');
  }
}
