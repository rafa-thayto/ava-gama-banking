import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) {}

  saldoInsuficiente() {
    this.snackBar.open('Não foi possível efetuar essa transação. Seu saldo é insuficiente.', 'Ok', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  ngOnInit() {
  }

}
