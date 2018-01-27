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


  tiles = [

    {text: `Saldo: ${this.balance}`, cols: 5, rows: 1, fontsize:30},

    {text: `Créditos: ${this.credits}`, cols: 2, rows: 1, color:"green"},

    {text: '', cols: 1, rows: 1},

    {text: `Débitos: ${this.debits}`, cols: 2, rows: 1, color:"red"}

  ];

  constructor() {


  }

 

  ngOnInit() {
  }

}
