import { ITransaction } from './../../../app.interfaces/transaction';
import { TransactionService } from './../../../app.services/transaction.service';
import { Component, OnInit, Input, transition } from '@angular/core';
import { AccountComponent } from '../../account/account.component'

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


  constructor (private service: TransactionService) {
  }

  public performTransaction(transaction) {
     this.service.performTransaction(transaction)
    //  .subscribe( () => console.log(`Efetuou: ${transaction}`)),
    //    erro => console.log(erro)
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
