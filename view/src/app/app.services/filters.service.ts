import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IRequest } from './transaction.service';

@Injectable()
export class FiltersService {
  filterWatcher: ReplaySubject<{}>;

  public filternav;
  public dateStart: Date = new Date();
  public dateEnd: Date = new Date();
  public valueStart: number;
  public valueEnd: number;

  constructor() {
    this.filterWatcher = new ReplaySubject(1);
  }

  filtrar(){
    const options: Partial<IRequest> = {
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      valueStart: this.valueStart,
      valueEnd: this.valueEnd
    };
    this.filterWatcher.next(options);
  }



}
