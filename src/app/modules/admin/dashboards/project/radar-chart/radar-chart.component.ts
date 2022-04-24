import {Component, Input, OnInit} from '@angular/core';
import {StackedChartOptions} from '../type';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {
  @Input() title = '';
  @Input() displayItems = [];
  @Input() header: string[];

  @Input()
  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.loadChartOptions(value);
  }

  private _data;

  chartOptions: Partial<StackedChartOptions>;
  displayItemsIndex;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDisplayItemsIndex() {
    this.displayItemsIndex = this.displayItems.map(it => this.header.indexOf(it));
  }

  private loadChartOptions(data) {
    if (!data) {
      this.chartOptions = null;
      return;
    }

    this.getDisplayItemsIndex();
    this.chartOptions = {
      series: data.map(it => {
        let filtered = it.data.filter((_, index) => this.displayItemsIndex.includes(index));
        it.data = [...filtered];
        return it;
      }),
      chart: {
        height: 550,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: 'category',
        categories: this.displayItems
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
  }
}
