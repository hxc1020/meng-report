import {Component, Input, OnInit} from '@angular/core';
import {ErrorFiled} from '../type';
import _ from 'lodash';
import {sumArray} from '../data-util';

@Component({
  selector: 'app-month-dashboard',
  templateUrl: './month-dashboard.component.html',
  styleUrls: ['./month-dashboard.component.scss']
})
export class MonthDashboardComponent implements OnInit {
  @Input() errorField: ErrorFiled;
  @Input() header;

  @Input() data;

  yearField = '年份';
  monthField = '月份';

  groupByMonthData;

  constructor() {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    const tmpData = JSON.parse(JSON.stringify(this.data));
    const categories = [];
    const groupByMonth = _.chain(tmpData)
      .groupBy(it => it[this.header.indexOf(this.yearField)])
      .map((v, year) => {
        return {
          year: year,
          data:
            _.chain(v)
              .groupBy(d => d[this.header.indexOf(this.monthField)])
              .mapValues(v => sumArray(v))
              .tap(p => {
                _.keys(p).forEach(key => categories.push(`${year}${key}`));
              })
              .values()
              .value()
        };
      })
      .flatMap(it => it.data)
      .value();

    let allErrorFieldIndex = this.errorField.allError.map(e => this.header.indexOf(e));
    let result = [];
    groupByMonth.forEach(monthData => {
      let d = allErrorFieldIndex.map(i => monthData[i]);
      d.forEach((it, i) => {
        if (!result[i]) {
          result[i] = {
            name: this.errorField.allError[i],
            data: []
          };
        }
        result[i].data.push(it);
      });
    });
    this.groupByMonthData = {
      categories,
      data: result
    };
    console.log(this.groupByMonthData);
  }
}
