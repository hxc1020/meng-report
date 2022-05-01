import {Component, Input, OnInit} from '@angular/core';
import {ErrorFiled, Select} from '../type';
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
  momData;

  filteredData;

  filerNames;
  filter;
  selected: Map<string, Select>;

  constructor() {
    this.filerNames = ['组别', '月份', '客服ID'];
    this.selected = new Map();
    this.filerNames.forEach(name => this.selected[name] = '全选');
    this.momData = {
      name: '无',
      data: []
    }
  }

  ngOnInit(): void {
    this.filterData();
    this.loadData();
    this.loadFilter();
  }

  private loadData() {
    const tmpData = JSON.parse(JSON.stringify(this.filteredData));
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
    console.log('group by month data : ', this.groupByMonthData);
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
    this.filterData();
    this.loadData();
    if (this.selected['月份'] !== '全选') {
      const tmp = JSON.parse(JSON.stringify(this.groupByMonthData));
      let monthIndex = tmp.categories.map(c => c.substring(5)).indexOf(this.selected['月份']);
      if (monthIndex === 0) {
        this.momData = {name: tmp.categories[monthIndex], data: []};
      } else {
        this.momData = {
          name: tmp.categories[monthIndex],
          data: tmp.data.map(d => {
            let lastMonth = d.data[monthIndex - 1];
            if (lastMonth === 0) {
              lastMonth = 1;
            }
            let mom: number = (d.data[monthIndex] - lastMonth) / lastMonth;
            if (isNaN(mom)) {
              mom = 0;
            }
            return Number(mom.toFixed(2)) * 100;
          })
        };
      }
      this.groupByMonthData = {
        categories: [this.groupByMonthData.categories[monthIndex]],
        data: this.groupByMonthData.data.map(d => {
          d.data = [d.data[monthIndex]];
          return d;
        })
      };
    }else {
      this.momData = {
        name: '无',
        data: []
      }
    }
  }

  private filterData() {
    const excludeMonthFilter = this.filerNames.filter(f => f !== '月份');
    this.filteredData = this.data.filter(d =>
      _.every(excludeMonthFilter, name => d[this.header.indexOf(name)] === this.selected[name] || this.selected[name] === '全选')
    );
  }

}
