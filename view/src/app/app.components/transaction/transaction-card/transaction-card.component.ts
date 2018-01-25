import { Component, OnInit, Input } from '@angular/core';
import { TransactionCreateComponent } from '../transaction-create/transaction-create.component';
import { ITransaction } from '../../../app.interfaces/transaction';


@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent implements OnInit {

  @Input() transaction: ITransaction

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
