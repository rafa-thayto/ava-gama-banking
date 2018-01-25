import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../app.interfaces/transaction';

@Injectable()
export class TransactionService {

  http: Http;

  constructor() { }

  getById(id: string) : Observable<ITransaction>  {
    return Observable.empty()
}

efetivarTransacao(event) {
  event.preventDefault();

  // cria uma instância de Headers
  let headers = new Headers();
  // Adiciona o tipo de conteúdo application/json 
  headers.append('Content-Type', 'application/json');

  this.http.post('URL', JSON.stringify(null), { headers: headers })
      .subscribe(() => {
          console.log('Sucesso');
      }, erro => {
          console.log(erro);
      });
}
}
