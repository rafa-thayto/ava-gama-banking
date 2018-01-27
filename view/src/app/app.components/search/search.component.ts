import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //TODO: remover any e criar uma interface tipando o dado
  pesquisa: any = {
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


public maskAgencia = [ /[1-9]/, /\d/, /\d/,/\d/]

public maskConta = [ /[1-9]/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/]


public maskTransf = [ /[1-9]/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/]


  limpa(form?) {
    console.log(form)
  }

  onSubmit(form) {
    console.log(form);
  }



  ngOnInit() {
  }


  // public modalActions = new EventEmitter<string | MaterializeAction>();

  limpar() {
    // this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  filtrar() {
    // this.modalActions.emit({ action: "modal", params: ['close'] });
  }

}
