import { Component } from '@angular/core';
import { TransactionService } from '../../../app.services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { ITransaction } from '../../../app.interfaces/transaction';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { AuthService } from '../../../app.services/auth.service';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent {
  public transaction: ITransaction;
  public loading: boolean = true;

  constructor(private authService: AuthService, private transactionService: TransactionService, private activatedRoute: ActivatedRoute) {
    const transactionId = this.activatedRoute.snapshot.params.id;
    Observable.combineLatest(this.authService.account,this.transactionService.getById(transactionId)).first()
      .map(data => ({account: data[0], transaction: data[1]}))
      .subscribe(data => {
        data.transaction.isCredit = data.account.account_number === data.transaction.to.account_number;
        this.loading = false;
        this.transaction = data.transaction;
      })
  }

}
