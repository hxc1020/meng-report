import {Component, Input, OnInit} from '@angular/core';
import {StackedChartOptions} from '../type';

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.scss']
})
export class StackedChartComponent implements OnInit {
  chartOptions: Partial<StackedChartOptions>;

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

  constructor() {
  }

  ngOnInit(): void {
  }

  private loadChartOptions(data) {
    this.chartOptions = {
      series: data.data.filter(it => this.displayItems.includes(it.name)),
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
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
        categories: this.data.categories
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
