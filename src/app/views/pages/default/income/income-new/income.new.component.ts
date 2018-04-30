import { Income } from './../../../../../_models/income';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from './../../../../../_services/confirm.service';
import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IncomeService } from '../../../../../_services/income.service';

@Component({
  templateUrl: './income.new.component.html',
  styleUrls: ['./income.new.component.scss']
})

export class IncomeNewComponent {
  model;
  zones = [
    { id: '5ae55bea734d1d13318331ad', name: 'Irvine' },
    { id: '5ae55c4f734d1d13318331b4', name: 'La Verne' },
    { id: '5ae55c63734d1d13318331b5', name: 'Temple City' }
  ];
  selectedZone: any = this.zones[0].id;

  types = [
    { id: '5ae6465a734d1d1331837219', name: 'General Offering' },
    { id: '5ae6466b734d1d1331837220', name: 'Rental Income' },
    { id: '5ae6468a734d1d133183722b', name: 'Building Fund' },
    { id: '5ae6469a734d1d1331837234', name: 'Others'}
  ];

  selectedType: any = this.types[0].id;

  amount: Number = 0;

  incomes = [];

  constructor(
    private _confirmService: ConfirmService,
    private _incomeService: IncomeService,
    private _toastrService: ToastrService ) {
    this.incomes[0] = {};
    this.incomes[0].amount = 0;
    this.incomes[0].selectedZone = this.zones[0].id;
    this.incomes[0].selectedType = this.types[0].id;

    this.selectToday();
  }

  addAnItem() {
    const inc: any = {};
    inc.amount = 0;
    inc.selectedZone = this.zones[0].id;
    inc.selectedType = this.types[0].id;
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
    this.incomes[0].selectedZone = this.zones[0].id;
    this.incomes[0].selectedType = this.types[0].id;
  }

  selectToday() {
    const now = new Date();
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
}
