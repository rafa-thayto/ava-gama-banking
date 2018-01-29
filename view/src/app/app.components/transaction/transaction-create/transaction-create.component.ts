import { Component, OnInit, Input, transition } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from './../../../app.services/transaction.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  private firstFormGroup: FormGroup
  private secondFormGroup: FormGroup
  private isLinear = true

  agencia: number
  conta: number
  valorTransferido: number
  
  //mascara numero da agência
  public maskAgencia = [/[0-9]/, /\d/, /\d/, /\d/]

  //mascara numero da conta
  public maskConta = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  public valorTranferido() {
    console.log(this.valorTranferido);
  }

  constructor(private service: TransactionService, private fb: FormBuilder) {
  }

  public performTransaction(transaction) {
    this.service.performTransaction(transaction)
    //  .subscribe( () => console.log(`Efetuou: ${transaction}`)),
    //    erro => console.log(erro)
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      'minhaConta': ['', Validators.required],
      'agencia': ['' , Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      'conta': ['' , Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(6)])],
      'valorTransferido': ['' , Validators.compose([Validators.required, Validators.maxLength(13)])]

    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
