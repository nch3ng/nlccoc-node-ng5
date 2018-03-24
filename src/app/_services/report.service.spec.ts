import { TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { ReportService } from "./report.service";
import { AuthenticationService } from "../auth/_services";
import { HttpClient } from '@angular/common/http';

describe('Service => ReportService', () => {

  let service: ReportService; 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportService]
    })

    service = TestBed.get(ReportService);
  })
})