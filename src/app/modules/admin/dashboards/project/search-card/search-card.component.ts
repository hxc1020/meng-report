import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import _ from 'lodash';
import {DashBoardFilter} from '../type';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  @Input() items = [];
  @Output() select = new EventEmitter<Array<String>>();
  @Input() filters: DashBoardFilter[];

  output;
  selected;

  @Input()
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _title = '';

  constructor() {
    this.selected = [];
  }

  ngOnInit(): void {
  }

  onItemChange($event: MatCheckboxChange) {
    if ($event.checked) {
      this.selected = [...this.selected, $event.source.value];
    } else {
      _.remove(this.selected, item => item === $event.source.value);
    }
    this.select.emit(this.selected);
  }

  selectAll() {
    this.selected = [...this.items];
    this.select.emit(this.selected);
  }

  selectNone() {
    this.selected = [];
    this.select.emit(this.selected);
  }
}
