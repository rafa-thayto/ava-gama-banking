import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PainelComponent } from './painel.component';

@NgModule({
  imports: [ CommonModule, NgbModule ],
  declarations: [ PainelComponent ],
  exports: [ PainelComponent ]
})
export class PainelModule { }