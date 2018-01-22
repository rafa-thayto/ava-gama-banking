import { Component, OnInit } from '@angular/core';
import { TransactionCreateComponent} from '../transaction-create/transaction-create.component'
import { TransactionCardComponent} from '../transaction-card/transaction-card.component'

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: TransactionCreateComponent [] = new Array<TransactionCreateComponent>();
  transacao1: TransactionCreateComponent = new TransactionCreateComponent();
  transacao2: TransactionCreateComponent = new TransactionCreateComponent();
  transacao3: TransactionCreateComponent = new TransactionCreateComponent();

  constructor() { }

  ngOnInit() {
    this.transacao1.agenciaDestino = 2
    this.transacao1.agenciaOrigem = 1
    this.transacao1.bancoDestino = 22
    this.transacao1.contaDestino = 2222
    this.transacao1.contaOrigem = 1111
    this.transacao1.cpfOrigem = 11111111111
    this.transacao1.nomeDestino = 'Zé'
    this.transacao1.nomeOrigem = 'Bruno'
    this.transacao1.tipoContaDestino = 'CC'
    this.transacao1.tipoContaOrigem = 'CC'
    this.transacao1.valorTransferencia = 5000
    this.transacao1.horarioTransferencia = Date.now();

    this.transacao2.agenciaDestino = 2
    this.transacao2.agenciaOrigem = 2
    this.transacao2.bancoDestino = 22
    this.transacao2.contaDestino = 2222
    this.transacao2.contaOrigem = 2222
    this.transacao2.cpfOrigem = 22222222222
    this.transacao2.nomeDestino = 'João'
    this.transacao2.nomeOrigem = 'Bruno'
    this.transacao2.tipoContaDestino = 'CC'
    this.transacao2.tipoContaOrigem = 'CC'
    this.transacao2.valorTransferencia = 12000
    this.transacao2.horarioTransferencia = Date.now();

    this.transactions.push(this.transacao1)
    this.transactions.push(this.transacao2)

  }

}
