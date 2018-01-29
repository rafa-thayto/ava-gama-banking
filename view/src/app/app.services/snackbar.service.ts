import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackbarService {
  
  constructor(public snackBar: MatSnackBar) {}

  saldoInsuficiente() {
    this.snackBar.open('Não foi possível efetuar essa transação. Seu saldo é insuficiente.', 'Ok', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
