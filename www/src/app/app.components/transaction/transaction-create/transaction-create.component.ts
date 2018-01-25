import { Component, OnInit, Input, transition } from '@angular/core';
import { SelectComponent} from '../../../app.material-components/select/select.component';
import { ITransaction} from '../../../app.interfaces/transaction'
import { AccountComponent} from '../../account/account.component'
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  
//iniciando as variaveis 
public agencia = ''
public conta = ''

//mascara numero da agência
public maskAgencia = [ /[1-9]/, /\d/, /\d/,/\d/]

//mascara numero da conta 
public maskConta = [ /[1-9]/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/]


  http: Http;
  
 public transaction: ITransaction;
  constructor() {

  }

  public getTransaction() {
    return this.transaction
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
