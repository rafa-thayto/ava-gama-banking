import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TransactionService } from '../../app.services/transaction.service';
import { NavbarService } from '../../app.services/navbar.service';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from '../../app.services/auth.service';
import { ITransaction } from '../../app.interfaces/transaction';

import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public subscription: Subscription;
  public loading: boolean = true;
  public lastTransactions: ITransaction[]

  dateStart = '';
  dateEnd = '';
  valueStart: number;
  valueEnd: number;
  ag: number;
  account_number: number;
  clienteName: String;
  typeAccount: String;
  error: String;

  filter;


  constructor(private advancedfilterTransactions: TransactionService, public authService: AuthService , private router: Router) {

    this.subscription = this.authService.account
    .do(() => this.loading = true)
    .flatMap(account => this.advancedfilterTransactions.find({ ag: account.ag, account_number: account.account_number}).first())
    .delay(1000)
    .do(() => this.loading = false)
    .subscribe(transactions => this.lastTransactions = transactions)

   
  }

public maskAgencia = [ /[1-9]/, /\d/, /\d/,/\d/]
public maskConta = [ /[1-9]/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/]
public maskTransf = [ /[1-9]/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/]
public MaskDate = [ /[0-9]/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/]

  ngOnInit() {

  }

  limpar() {

  this.dateStart = '';
  this.dateEnd = '';
  this.valueStart = 0;
  this.valueEnd = 0;
  this.ag = 0;
  this.account_number = 0;
  this.clienteName = '';
  this.typeAccount = '';
  this.error ='';
  }
  filtrar() {

    //parse String to Date
    var auxDate = this.dateStart.split('/');
    var stringFormatada = auxDate[0] + '-' + auxDate[1] + '-' + auxDate[2];
    var dateStart = new Date(stringFormatada);

    var auxDate = this.dateEnd.split('/');
    var stringFormatada = auxDate[0] + '-' + auxDate[1] + '-' + auxDate[2];
    var dateEnd = new Date(stringFormatada);

    this.error = ''
    this.filter = this.advancedfilterTransactions.advancedfilterTransactions(dateStart,dateEnd,this.valueStart,this.valueEnd,this.ag,this.account_number,this.clienteName,this.typeAccount)
    console.log(this.advancedfilterTransactions)
  }

  ngOnDestroy() {
    if (!this.subscription.closed) this.subscription.unsubscribe();
  }

}