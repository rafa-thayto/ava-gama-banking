import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TransactionService } from '../../app.services/transaction.service';
import { NavbarService } from '../../app.services/navbar.service';
import {MatSelectModule} from '@angular/material/select';
import { TransactionCardComponent } from '../transaction/transaction-card/transaction-card.component'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dateStart = '';
  dateEnd = '';
  valueStart: number;
  valueEnd: number;
  ag: number;
  account_number: number;
  clienteName: String;
  typeAccount: String;
  error: String;


  constructor(private advancedfilterTransactions: TransactionService, public navbarService: NavbarService, private router: Router) {

   
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
    this.advancedfilterTransactions.advancedfilterTransactions(dateStart,dateEnd,this.valueStart,this.valueEnd,this.ag,this.account_number,this.clienteName,this.typeAccount)
    console.log(this.advancedfilterTransactions)
  }

}