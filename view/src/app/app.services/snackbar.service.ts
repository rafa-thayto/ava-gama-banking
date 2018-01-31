import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackbarService {
  
  constructor(public snackBar: MatSnackBar) {}

  saldoInsuficiente() {
    this.snackBar.open('Saldo insuficiente.', 'OK', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  senhaIncorreta() {
    this.snackBar.open('Senha incorreta, tente novamente.', null, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
