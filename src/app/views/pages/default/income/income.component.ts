import { Component } from '@angular/core';

@Component({
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})

export class IncomeComponent {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { headerCheckboxable: true },
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
}
