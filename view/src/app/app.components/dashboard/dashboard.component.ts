import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app.services/auth.service';
import { TransactionService } from '../../app.services/transaction.service';
import { Observable } from 'rxjs/Observable';
import { ITransaction } from '../../app.interfaces/transaction';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public loading: boolean;
  public lastTransactions: Observable<ITransaction[]>

  constructor(private authService: AuthService, private transactionService: TransactionService) {
    this.lastTransactions = this.authService.account
      .do(() => this.loading = true)
      .flatMap(account => this.transactionService.find({ ag: account.ag, account_number: account.account_number, limit: 10 }))
      .delay(1000)
      .do(() => this.loading = false);
  }
}
