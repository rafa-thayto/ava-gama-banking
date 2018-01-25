import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { ActivatedRoute } from '@angular/router';
import { MaterializeModule , MaterializeAction} from 'materialize-css';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
     
  Pesquisa: any ={
    val_ini: '',
    val_fim: '',
    dt_ini: '',
    dt_fim: '',
    ag_dest: '',
    ac_dest: '',
    name: ''
  }

  constructor() { 
    
    }

  
    limpa(form){
      console.log(form)
    }
  
      onSubmit(form){
        console.log(form);
      }
  


  ngOnInit() {
  }


  public modalActions = new EventEmitter<string|MaterializeAction>();
  
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  
}
