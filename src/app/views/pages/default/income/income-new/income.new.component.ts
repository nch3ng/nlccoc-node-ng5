import { ActivatedRoute, Data } from '@angular/router';
import { OnInit } from '@angular/core';
import { ZoneService } from './../../../../../_services/zone.service';
import { Income, Zone, IncomeType } from './../../../../../_models/income';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from './../../../../../_services/confirm.service';
import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IncomeService } from '../../../../../_services/income.service';

@Component({
  templateUrl: './income.new.component.html',
  styleUrls: ['./income.new.component.scss']
})

export class IncomeNewComponent implements OnInit {
  model;
  zones: Zone [] = [];

  types: IncomeType [] = [];

  amount: Number = 0;

  incomes = [];

  constructor(
    private _confirmService: ConfirmService,
    private _incomeService: IncomeService,
    private _toastrService: ToastrService,
    private _zoneService: ZoneService,
    private route: ActivatedRoute ) {
    this.selectToday();
  }

  ngOnInit() {
    this.incomes[0] = {};
    this.incomes[0].amount = 0;
    this.route.data.subscribe(
      (data: Data) => {
        console.log(data);
        if (data['zones']) {
          this.zones = data['zones'];
          this.incomes[0].selectedZone = this.zones[0]._id;
          console.log(this.zones);
        }

        if (data['types']) {
          this.types = data['types'];
          this.incomes[0].selectedType = this.types[0]._id;
          console.log(this.types);
        }
      }
    );
  }

  addAnItem() {
    const inc: any = {};
    inc.amount = 0;
    inc.selectedZone = this.zones[0]._id;
    inc.selectedType = this.types[0]._id;
    this.incomes.push(inc);
  }

  onSubmit() {
    this._confirmService.open('Are you ready to submit?').then(
      () => {
        console.log(this.model);
        for (const income of this.incomes) {
          income.date = this.model.year + '/' + this.model.month + '/' + this.model.day;
          income.zone = income.selectedZone;
          income.type = income.selectedType;
          this._incomeService.create(income).subscribe(
            (rIncome: Income) => {
              console.log(rIncome);
              this._toastrService.success('Create an income of [' + rIncome.amount + ']');
            },
            (error) => {
              this._toastrService.error('Something went wrong', 'Error' );
            }
          );
        }
        this.onReset();
      }).catch( () => {
        // Reject
      });
  }

  onReset() {
    delete this.incomes;
    this.incomes = [];
    this.incomes[0] = {};
    this.incomes[0].amount = 0;
    this.incomes[0].selectedZone = this.zones[0]._id;
    this.incomes[0].selectedType = this.types[0]._id;
  }

  selectToday() {
    const now = new Date();
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
}
