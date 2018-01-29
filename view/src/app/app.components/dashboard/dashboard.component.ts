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
  public lastTransactions: Observable<ITransaction[]>

  constructor(private authService: AuthService, private transactionService: TransactionService) {
    this.lastTransactions = this.authService.account.flatMap(account => this.transactionService.find({ ag: account.ag, account_number: account.account_number, limit: 10 }));
  }
}
