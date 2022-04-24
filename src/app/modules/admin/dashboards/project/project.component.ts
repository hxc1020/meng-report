import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import {ErrorFiled} from './type';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
  data;
  header;

  title: string;
  filterKey;
  filters;
  errorFiled: ErrorFiled;

  /**
   * Constructor
   */
  constructor() {
    const basicError = ['风险意识', '服务红线', '平台规则'];
    const serviceError = ['敬语', '等候语', '转接语', '异常转接', '问题跳答', '不当安抚', '推诿问题', '一问一答', '只甩链接', '截图回复', '未回复', '快捷语', '服务消极', '不看聊天'];
    const businessError = ['产品知识', '解释能力', '答非所问', '拒绝生硬', '漏忘跟进', '其他差错', '盲目承诺'];
    const saleError = ['活动信息', '需求挖掘', '推荐周边产品（限三款商品）', '挽单', '催付/催拍', '收藏'];
    const allError = [...basicError, ...serviceError, ...businessError, ...saleError];
    this.errorFiled = {basicError, serviceError, businessError, saleError, allError};
    console.log(this.errorFiled);
    this.filterKey = ['年份', '月份', '组别', '客服ID'];
  }

  ngOnInit(): void {
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  uploadData($event: Event) {
    /* wire up file reader */
    const target: DataTransfer = $event.target as unknown as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, {header: 1}); // to get 2d array pass 2nd parameter as object {header: 1}
      this.header = data[0];
      this.data = _.tail(data);
      this.loadFilters();
    };
  }

  private loadFilters() {
    const filterKeyIndex = this.filterKey.map(key => this.header.indexOf(key));
    let tmpFilter = this.data.map(row => [..._.filter(row, (_, index) => filterKeyIndex.includes(index))]);
    const result: Array<Set<String>> = [];
    tmpFilter.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        if (!result[i]) {
          result[i] = new Set<String>();
        }
        result[i].add(row[i]);
      }
    });
    this.filters = result.map((s, i) => {
      return {
        name: this.filterKey[i],
        data: s
      };
    });
    console.log(this.filters);
  }
}


