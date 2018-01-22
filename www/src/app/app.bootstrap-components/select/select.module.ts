import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [SelectComponent],
  exports: [ SelectComponent ]
})
export class SelectModule { }
