import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { ActivatedRoute } from '@angular/router';
import { MaterializeModule ,MaterializeAction} from 'angular2-materialize';





@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
     

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