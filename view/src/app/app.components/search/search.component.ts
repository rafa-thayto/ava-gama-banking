import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TransactionService } from '../../app.services/transaction.service';
import { NavbarService } from '../../app.services/navbar.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dateStart = new Date();
  dateEnd = new Date();
  valueStart: number = 11;
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

  ngOnInit() {
  }

  limpar() {

    console.log(this.dateEnd, this.account_number,this.clienteName)
  }
  filtrar() {
    this.error = ''
    this.advancedfilterTransactions.AdvancedfilterTransactions(this.dateStart,this.dateEnd,this.valueStart,this.valueEnd,this.ag,this.account_number,this.clienteName,this.typeAccount)
  }

}