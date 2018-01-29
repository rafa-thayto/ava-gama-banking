import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  tiles = [
    {text: 'de:', cols: 1, rows: 1},
    {text: 'Marcos Rodrigues', cols: 1, rows: 1},
    {text: 'para:', cols: 1, rows: 1},
    {text: 'Avanade', cols: 1, rows: 1},
    {text: 'saldo atual:', cols: 1, rows: 1},
    {text: 'R$ 1.000,00', cols: 1, rows: 1},
    {text: 'débito:', cols: 1, rows: 1},
    {text: '- R$ 50,00', cols: 1, rows: 1, color: `${'debito'=='debito'? 'red':'green'}`},
    {text: 'saldo após:', cols: 1, rows: 1},
    {text: 'R$ 950,00', cols: 1, rows: 1},
    {text: 'data de execução:', cols: 1, rows: 1},
    {text: '21/01/2018', cols: 1, rows: 1},
  ];
  
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
