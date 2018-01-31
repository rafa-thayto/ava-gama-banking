import { Component, OnInit, Input, transition } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TransactionService } from './../../../app.services/transaction.service';
import { Observable } from 'rxjs/Observable';
import { ITransaction } from '../../../app.interfaces/transaction';
import { ClientService } from '../../../app.services/client.service';
import { AuthService } from '../../../app.services/auth.service';
import { SnackbarService } from '../../../app.services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-transaction-create",
  templateUrl: "./transaction-create.component.html",
  styleUrls: ["./transaction-create.component.css"]
})
export class TransactionCreateComponent {
  public senhaControl: FormControl;
  public valorTransferido: FormControl;
  public contaControl: FormControl;
  public agenciaControl: FormControl;
  public loading: boolean = false;
  public transaction: Partial<ITransaction>;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public isLinear = true;

  public saldoInsuficiente: boolean = false

  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private clientService: ClientService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.createControls();
    this.createForm();
  }

  public maskTransf = [/[1-9]/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/];

  createAgenciaControl() {
    const syncValidators = [];
    syncValidators.push(Validators.compose([Validators.required, Validators.max(1)]));
    this.agenciaControl = new FormControl("1", syncValidators);
  }

  createContaControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    this.contaControl = new FormControl("", syncValidators);
  }

  createValorTransferidoControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    this.valorTransferido = new FormControl("", syncValidators);
  }

  createSenhaControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    syncValidators.push(Validators.minLength(6));
    syncValidators.push(Validators.maxLength(25));
    this.senhaControl = new FormControl("", syncValidators);
  }

  createControls() {
    this.createAgenciaControl();
    this.createContaControl();
    this.createSenhaControl();
    this.createValorTransferidoControl();
  }

  createForm() {
    const controls = {
      ag: this.agenciaControl,
      account_number: this.contaControl,
      value: this.valorTransferido
    };

    this.firstFormGroup = new FormGroup(controls);
    this.secondFormGroup = new FormGroup({ password: this.senhaControl });
  }

  save() {
    this.saldoInsuficiente = false;
    this.transaction = null;
    if (!this.firstFormGroup.valid) return;
    this.loading = true;
    const formValue = this.firstFormGroup.value;
    this.transaction = {
      to: {
        ag: parseInt(formValue.ag),
        account_number: parseInt(formValue.account_number)
      },
      value: Number(formValue.value)
    };

    const fromClientInfo = this.authService.client.first();
    const fromAccountInfo = this.authService.account.first();
    const toClientInfo = this.clientService
      .getClientInfo(this.transaction.to.ag, this.transaction.to.account_number)
      .first();
    Observable.combineLatest(fromClientInfo, fromAccountInfo, toClientInfo)
      .map(data => ({
        fromClient: data[0],
        fromAccount: data[1],
        toClient: data[2]
      }))
      .delay(1000)
      .subscribe(data => {
        if(data.fromAccount.balance < this.transaction.value) { 
          this.saldoInsuficiente = true
          this.snackbarService.saldoInsuficiente();
        }
        this.transaction.to.client = data.toClient;
        // console.log(data.fromAccount);
        this.transaction.from = data.fromAccount;
        this.transaction.from.client = { name: data.fromClient.name };
        this.loading = false;
      });
  }

  createTransaction() {
    const onSuccess = trasaction => {
      this.authService.refreshBalance();
      this.router.navigateByUrl(`/transferencias/${trasaction._id}`);
    };
    const onError = error => {
      this.snackbarService.senhaIncorreta();
      this.senhaControl.reset();

    };
    const onComplete = () => {};
    console.log(this.transaction);
    this.transaction.password = this.senhaControl.value;
    this.transactionService
      .createTransaction(this.transaction)
      .subscribe(onSuccess, onError, onComplete);
    // this.data.account_number
    // this.data.ag
    // this.data.value
  }
}
