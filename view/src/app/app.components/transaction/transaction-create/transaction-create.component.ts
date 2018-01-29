import { Component, OnInit, Input, transition } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TransactionService } from './../../../app.services/transaction.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  private senhaControl: FormControl
  private valorTransferido: FormControl
  private contaControl: FormControl
  private agenciaControl: FormControl
  private senha: '';
  public data: {
    ag: '',
    account_number: '',
    value: ''
  }

  // Material Steps
  public firstFormGroup: FormGroup
  public secondFormGroup: FormGroup
  public isLinear = true

  // Masks
  // public maskAgencia = [/[0-9]/, /\d/, /\d/, /\d/]
  // public maskConta = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(private service: TransactionService, private fb: FormBuilder) {
    this.createControls()
    this.createForm()
  }

  public performTransaction(transaction) {
    this.service.performTransaction(transaction)
    //  .subscribe( () => console.log(`Efetuou: ${transaction}`)),
    //    erro => console.log(erro)
  }

  createAgenciaControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    //TODO: validators is CPF
    this.agenciaControl = new FormControl('', syncValidators);
  }

  createContaControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    //TODO: validators is CPF
    this.contaControl = new FormControl('', syncValidators);
  }

  createValorTransferidoControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    //TODO: validators is CPF
    this.valorTransferido = new FormControl('', syncValidators);
  }
  
  createSenhaControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    syncValidators.push(Validators.minLength(6));
    syncValidators.push(Validators.maxLength(25));
    this.senhaControl = new FormControl('', syncValidators);
  }

  createControls() {
    this.createAgenciaControl()
    this.createContaControl()
    this.createSenhaControl()
    this.createValorTransferidoControl()
  }

  createForm() {
    const controls = { 
        ag: this.agenciaControl,
        account_number: this.contaControl, 
        value: this.valorTransferido
      }
    
    this.firstFormGroup = new FormGroup(controls);
    this.secondFormGroup = new FormGroup({password: this.senhaControl});
  }
  
  save() {
    // this.error = ''
    if (!this.firstFormGroup.valid) return
    this.data = this.firstFormGroup.value;
    // if (typeof data.cpf === 'string')
    //   data.cpf = parseInt(data.cpf.replace(/[^0-9]/g, ''));
    // const onSubmitSuccess = () => {
    //   this.authService.account.filter(account => !!account).first().subscribe(() => this.router.navigateByUrl('/'));
    // };
    // const onSubmitError = (error: any) => this.error = 'usuário e/ou senha inválidos';
    //TODO: add loading
    // this.authService.Submit(data.cpf, data.password).first().subscribe(onSubmitSuccess, onSubmitError);
    console.log(this.data);
  }

  createTransaction() {
    console.log(`
      agencia: ${this.data.ag}
      número da conta: ${this.data.account_number}
      transação: ${this.data.value}
    `);
  }

  ngOnDestroy() {
    // this.navbarService.show();
  }

  ngOnInit() {
  }

}
