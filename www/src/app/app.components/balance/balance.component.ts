import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  balance: number = 1000.00
  credits: number = 566.45
  debits: number = 102.03

  constructor() {


  }

  ngOnInit() {
  }

}
