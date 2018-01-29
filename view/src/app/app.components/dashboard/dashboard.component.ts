import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../app.services/auth.service';
import { TransactionService } from '../../app.services/transaction.service';
import { Observable } from 'rxjs/Observable';
import { ITransaction } from '../../app.interfaces/transaction';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  public subscription: Subscription;
  public loading: boolean = true;
  public lastTransactions: ITransaction[]

  constructor(public authService: AuthService, public transactionService: TransactionService) {
    this.subscription = this.authService.account
      .do(() => this.loading = true)
      .flatMap(account => this.transactionService.find({ ag: account.ag, account_number: account.account_number, limit: 10 }).first())
      .delay(1000)
      .do(() => this.loading = false)
      .subscribe(transactions => this.lastTransactions = transactions)
  }
  ngOnDestroy() {
    if (!this.subscription.closed) this.subscription.unsubscribe();
  }
}
