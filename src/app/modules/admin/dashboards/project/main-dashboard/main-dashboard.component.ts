import {Component, Input, OnInit} from '@angular/core';
import {ErrorFiled} from '../type';
import _ from 'lodash';
import {sumArray} from '../data-util';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  @Input() errorField: ErrorFiled;
  @Input() header;

  @Input()
  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.loadData();
  }

  private _data;
  allSumData;
  groupByUserData;
  groupByGroupData;

  numberStartIndex = 9;

  constructor() {
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.allSumData = sumArray(this._data);
    this.groupByUserData = this.loadGroupData(this.header.indexOf('客服ID'));
    this.groupByGroupData = this.loadGroupData(this.header.indexOf('组别'));
  }

  private loadGroupData(index) {
    let userGroup = _.groupBy(this._data, it => it[index]);
    const grouped = _.mapValues(userGroup, it => {
      return sumArray(it);
    });
    return _.map(grouped, (v, k) => {
      return {
        name: k,
        data: v
      };
    });
  }
}
