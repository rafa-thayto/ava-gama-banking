import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions.components/transactions-list/transactions-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  declarations: [TransactionsListComponent],
  exports: [TransactionsListComponent]
})
export class TransactionsModule { }
