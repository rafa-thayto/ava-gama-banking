import { Component, OnInit, Input } from '@angular/core';
//import { SelectComponent} from '../../../app.bootstrap-components/select/select.component'

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {


  constructor() {

      
  }

  opcoesSelect: Array<any>;         
    
    ngOnInit() { 
        this.opcoesSelect = [
          {
            valor : 1,
            descricao: 'Próprio favorecido'
          },
          {
            valor : 2,
            descricao: 'Outra conta'
          },
        ];
    } 

}
