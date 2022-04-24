import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';
import {ChartOptions} from '../type';


@Component({
  selector: 'app-vertical-chart',
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.scss']
})
export class VerticalChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
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

  chartOptions: Partial<ChartOptions>;
  displayItemsIndex;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDisplayItemsIndex() {
    this.displayItemsIndex = this.displayItems.map(it => this.header.indexOf(it));
  }

  loadChartOptions(data) {
    if (!data) {
      this.chartOptions = null;
      return;
    }
    this.getDisplayItemsIndex();
    this.chartOptions = {
      series: [
        {
          name: '次数',
          data: data.filter((_, index) => this.displayItemsIndex.includes(index))
        }
      ],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.displayItems,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
    };
  }

}
