import { Component } from '@angular/core';
import { TransactionService, IRequest } from '../../app.services/transaction.service';
import { AuthService } from '../../app.services/auth.service';
import { ITransaction } from '../../app.interfaces/transaction';

import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { FiltersService } from '../../app.services/filters.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  // public sideMenuMode: string = 'over';
  // public sideMenuOpen: boolean = false;

  // clienteName: String;
  // typeAccount: String;
  // error: String;

  public subscription: Subscription;
  public loading: boolean = true;
  public transactions: ITransaction[] = [];
  // public onMediaChange = (media: MediaChange) => {
  //   console.log("changed!")
  //   const alias = media.mqAlias;
  //   const isSmall = ['xs', 'sm'].indexOf(alias) > -1;
  //   if (isSmall) {
  //     this.sideMenuMode = 'over'
  //     this.sideMenuOpen = false;
  //   } else {
  //     this.sideMenuMode = 'side'
  //     this.sideMenuOpen = true;
  //   }
  // }

  constructor(private transactionService: TransactionService, public authService: AuthService, public filtersService: FiltersService) {
    const accountObs = this.authService.account;
    // this.media.subscribe(this.onMediaChange.bind(this))
    // this.media.asObservable().subscribe(this.onMediaChange.bind(this));
    this.subscription = Observable.combineLatest(accountObs, this.filtersService.filterWatcher)
      .do(() => this.loading = true)
      .map(data => {
        const request: Partial<IRequest> = data[1];
        const account = data[0];
        request.ag = account.ag;
        request.account_number = account.account_number;
        return request;
      })
      .flatMap(request => this.transactionService.find(request).first())
      .do(() => this.loading = false)
      .subscribe(
        transactions => this.transactions = transactions,
        error => console.log(error)
      )
    this.filtersService.filtrar();
  }

  ngOnDestroy() {
    if (!this.subscription.closed) this.subscription.unsubscribe();
  }

}
