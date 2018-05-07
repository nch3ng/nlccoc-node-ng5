import { ViewEncapsulation } from '@angular/core';
import { Income } from './../../../../_models/income';
import { ActivatedRoute, Data } from '@angular/router';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class IncomeComponent implements OnInit {
  incomes: Income [] = [];
  constructor(private _route: ActivatedRoute) {
    console.log('constructor');
  }
  ngOnInit() {
    this._route.data.subscribe(
      (data: Data) => {
        if (data['incomes']) {
          this.incomes = data['incomes'];
        }
      }
    );
  }
  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' },
  // ];
  // columns = [
  //   { headerCheckboxable: true },
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];
}
