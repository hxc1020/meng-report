import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Select} from '../type';
import _ from 'lodash';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  @Output() select = new EventEmitter<Map<string, Select>>();
  @Input() filters: [][];
  @Input() filterNames;

  output;
  selected;
  enabledFilters;

  constructor() {
    this.selected = new Map<string, Select>();
  }

  ngOnInit(): void {
    this.filters.forEach((_, i) => this.selected[this.filterNames[i]] = '全选');
    this.enabledFilters = this.filters;
  }

  getFilter(f, name) {
    let index = this.filterNames.indexOf(name);
    return _.uniq(f.map(f => f[index]));
  }

  selectAll(name: string) {
    this.selected[name] = '全选';
    this.select.emit(this.selected);
    this.enabledFilters = this.filters;
  }

  filterColor(item: any, name: any): ThemePalette {
    return this.selected[name] === item || this.selected[name] === '全选' ? 'primary' : 'accent';
  }

  onClick(item: any, name: any) {
    this.selected[name] = item;
    this.select.emit(this.selected);
    if (name === '组别') {
      let index = this.filterNames.indexOf(name);
      this.enabledFilters = this.filters.filter(f => f[index] === item);
    }
  }
}
