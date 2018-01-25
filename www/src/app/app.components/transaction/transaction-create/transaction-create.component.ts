import { ITransaction } from './../../../app.interfaces/transaction';
import { TransactionService } from './../../../app.services/transaction.service';
import { Component, OnInit, Input, transition } from '@angular/core';
import { AccountComponent } from '../../account/account.component'

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  //  Atributos de transaction para serem vinculados por ngModel
  //from: IAccount,
  // to: IAccount,
  // date: Date,
  // value: number,
  // status: TransactionStatus,
  // msg: string

  
  
  constructor (private service: TransactionService) {
  }

  public performTransaction(transaction) {
     this.service.performTransaction(transaction)
    //  .subscribe( () => console.log(`Efetuou: ${transaction}`)),
    //    erro => console.log(erro)
  }

  ngOnInit() {

  }

}
