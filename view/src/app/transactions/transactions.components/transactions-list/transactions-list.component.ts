import { Component, OnInit, Input } from '@angular/core';
import { ITransaction } from '../../../app.interfaces/transaction';

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent {
  @Input() subheader: string = "";
  @Input() transactions: ITransaction[];
  public getAvatarUrl(transaction: ITransaction): string {
    const id = transaction.isCredit ? transaction.from._id : transaction.to._id;
    return `//www.gravatar.com/avatar/${id}?s=50&d=identicon&r=PG`;
  }
}
