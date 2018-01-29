import { AuthService } from './../../../app.services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { TransactionCreateComponent } from '../transaction-create/transaction-create.component';
import { ITransaction } from '../../../app.interfaces/transaction';

@Component({
  selector: 'transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent implements OnInit {

  @Input() transaction: ITransaction

   image = `https://www.gravatar.com/avatar/${Math.floor(Math.random() * 999999999999999999) + 1000000000000000000}?s=50&d=identicon&r=PG`

  constructor(public authService: AuthService) {

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
