import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  
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
