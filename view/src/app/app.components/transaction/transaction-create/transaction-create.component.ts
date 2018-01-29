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

  
  private minhaConta: string
  private agencia: string
  private conta: string
  private valorTransferido: string
  private senha: string
  
  // Material Steps
  private firstFormGroup: FormGroup
  private secondFormGroup: FormGroup
  private isLinear = true

  // Masks
  // public maskAgencia = [/[0-9]/, /\d/, /\d/, /\d/]
  // public maskConta = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(private service: TransactionService, private fb: FormBuilder) {
  }

  public performTransaction(transaction) {
    this.service.performTransaction(transaction)
    //  .subscribe( () => console.log(`Efetuou: ${transaction}`)),
    //    erro => console.log(erro)
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      'minhaConta': ['', Validators.compose([Validators.required])],
      'agencia': ['' , Validators.compose([Validators.required])],
      'conta': ['' , Validators.compose([Validators.required])],
      'valorTransferido': ['' , Validators.compose([Validators.required])]
    });

    this.secondFormGroup = this.fb.group({
      'senha': ['', Validators.required]
    });
  }

}
