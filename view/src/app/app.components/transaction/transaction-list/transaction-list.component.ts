import { ITransaction } from './../../../app.interfaces/transaction';
import { TransactionService } from './../../../app.services/transaction.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { TransactionCreateComponent} from '../transaction-create/transaction-create.component'
import { TransactionCardComponent} from '../transaction-card/transaction-card.component'
import { Http, Headers } from '@angular/http';
@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions  = []

  transaction1 = {
    name : "João",
    value : 12000,
    data : new Date()
  }
  transaction2 = {
    name : "Maria",
    value : 15400,
    data : new Date()
  }
  


 
  constructor(private servico: TransactionService) {
  this.transactions.push(this.transaction1)
  this.transactions.push(this.transaction2)



  }

  ngOnInit() {

  }

  obterTransacoes() {


}
  // public modalActions = new EventEmitter<string|MaterializeAction>();

openModal() {
  // this.modalActions.emit({action:"modal",params:['open']});
}
closeModal() {
  // this.modalActions.emit({action:"modal",params:['close']});
}



}
