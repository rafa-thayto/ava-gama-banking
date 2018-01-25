import { Component, OnInit, EventEmitter } from '@angular/core';
import { TransactionCreateComponent} from '../transaction-create/transaction-create.component'
import { TransactionCardComponent} from '../transaction-card/transaction-card.component'
import { Http, Headers } from '@angular/http';
import { MaterializeModule, MaterializeAction } from 'angular2-materialize'
import { ITransaction} from '../../../app.interfaces/transaction'

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: ITransaction []


  http: Http;

  constructor(http: Http) {

    this.http = http;

  }

  ngOnInit() {

  }

  obterTransacoes() {

    this.http.get('URL')
        .subscribe(() => {
          console.log('Sucesso');
      }, erro => {
          console.log(erro);
      });
}
  public modalActions = new EventEmitter<string|MaterializeAction>();

openModal() {
  this.modalActions.emit({action:"modal",params:['open']});
}
closeModal() {
  this.modalActions.emit({action:"modal",params:['close']});
}



}
