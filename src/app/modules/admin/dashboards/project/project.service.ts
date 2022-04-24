import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  totalData$;
  groupData$;


  constructor() {
    this.totalData$ = new Subject();
    this.groupData$ = new Subject();
  }


  changeTotalData(value) {
    this.totalData$.next(value);
  }


  onTotalDataChange() {
    return this.totalData$;
  }

  changeGroupData(value) {
    this.groupData$.next(value);
  }


  onGroupDataChange() {
    return this.groupData$;
  }

}
