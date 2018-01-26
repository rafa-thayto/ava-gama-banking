import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelComponent } from './painel.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ PainelComponent ],
  exports: [ PainelComponent ]
})
export class PainelModule { }