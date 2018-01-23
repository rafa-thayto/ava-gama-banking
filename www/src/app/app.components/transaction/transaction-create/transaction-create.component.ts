import { Component, OnInit, Input } from '@angular/core';
import { SelectComponent} from '../../../app.material-components/select/select.component';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  http: Http;

  constructor() {


  }

  cpfOrigem: Number
  nomeOrigem: String
  agenciaOrigem: Number
  contaOrigem: Number
  tipoContaOrigem: String

  nomeDestino: String
  bancoDestino: Number
  agenciaDestino: Number
  contaDestino: Number
  tipoContaDestino: String

  horarioTransferencia: Date
  valorTransferencia: Number


  opcoesSelect: Array<any>;         
    
    ngOnInit() { 
        this.opcoesSelect = [
          {
            valor : 1,
            descricao: 'Próprio favorecido'
          },
          {
            valor : 2,
            descricao: 'Outra conta'
          },
        ];
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
