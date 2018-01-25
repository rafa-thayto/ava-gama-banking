import { Component, OnInit } from '@angular/core';
import { IClient } from '../../app.interfaces/client';
import { IAccount } from '../../app.interfaces/account';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  nomeUsuario: string
  agencia: number
  conta: number

  constructor() {
    this.nomeUsuario = "Bruno Marchini"
    this.agencia = 1234
    this.conta = 987654321
   }

  ngOnInit() {
  }

}
