import { Component, OnInit } from '@angular/core';
import { TransactionCreateComponent} from '../transaction-create/transaction-create.component'
import { TransactionCardComponent} from '../transaction-card/transaction-card.component'
import { Http, Headers } from '@angular/http';
import { ITransaction} from '../../../app.interfaces/transaction'

@Component({
  selector: 'app-transaction-list',
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

}
