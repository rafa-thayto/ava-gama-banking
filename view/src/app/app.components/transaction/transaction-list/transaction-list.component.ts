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
    name : "João das Neves",
    value : 12000,
    data : new Date(),
    type: 'credito'
  }
  transaction2 = {
    name : "Maria Fernanda",
    value : 15400,
    data : new Date(),
    type: 'debito'
  }
  transaction3 = {
    name : "Freddie Mercury",
    value : 999340,
    data : new Date(),
    type: 'credito'
  }
  transaction4 = {
    name : "Jon Bon Jovi",
    value : 19475400,
    data : new Date(),
    type: 'credito'
  }
  


 
  constructor(private servico: TransactionService) {
  this.transactions.push(this.transaction1)
  this.transactions.push(this.transaction2)
  this.transactions.push(this.transaction3)
  this.transactions.push(this.transaction4)



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
