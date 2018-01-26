import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public maskAgencia = [ /[1-9]/, /\d/, /\d/,/\d/]

  public maskConta = [ /[1-9]/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/]

  http: Http;

  constructor(http: Http) {

    this.http = http;

  }

  ngOnInit() {
  }

}
