import { Component, OnInit, Input } from '@angular/core';
import { SelectComponent} from '../../../app.material-components/select/select.component'

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

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

  valorTransferencia: Number
  horarioTransferencia



  constructor() {

      
  }

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

}
