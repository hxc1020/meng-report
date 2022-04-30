import {Component, Input, OnInit} from '@angular/core';
import {ErrorFiled, Select} from '../type';
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

  @Input() data;
  allSumData;
  groupByUserData;
  groupByGroupData;

  filteredData;

  filerNames;
  filter;
  selected: Map<string, Select>;

  constructor() {
    this.filerNames = ['组别', '月份', '客服ID'];
    this.selected = new Map();
    this.filerNames.forEach(name => this.selected[name] = '全选');
  }

  ngOnInit(): void {
    this.filteredData = this.filterData();
    this.loadData();
    this.loadFilter();
  }

  private loadData() {
    this.allSumData = sumArray(this.filteredData);
    this.groupByUserData = this.loadGroupData(this.header.indexOf('客服ID'));
    this.groupByGroupData = this.loadGroupData(this.header.indexOf('组别'));
    console.log(this.allSumData, this.groupByUserData, this.groupByGroupData);
  }

  private loadGroupData(index) {
    let userGroup = _.groupBy(this.filteredData, it => it[index]);
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

  private loadFilter() {
    const filterIndex = this.filerNames.map(name => this.header.indexOf(name));
    let tmpSet = new Set();
    this.filter = this.data.map(d => [...filterIndex.map(i => d[i])]).filter(d => {
      if (tmpSet.has(d[2])) {
        return false;
      } else {
        tmpSet.add(d[2]);
        return true;
      }
    });
    console.log(this.filter);
  }

  private getColumnSet(index: number) {
    return ['全选', ...new Set(this.data.map(d => d[index]))];
  }

  onFilterChange($event: Map<string, Select>) {
    this.selected = $event;
    this.filteredData = this.filterData();
    this.loadData();
  }

  private filterData() {
    return this.data.filter(d =>
      _.every(this.filerNames, name => d[this.header.indexOf(name)] === this.selected[name] || this.selected[name] === '全选')
    );
  }
}
