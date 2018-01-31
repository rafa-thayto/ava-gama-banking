import {Component} from '@angular/core';

@Component({
  selector: 'secret-key',
  templateUrl: './secretKey.component.html',
  styleUrls: ['./secretKey.component.css'],

})


export class SecretkeyComponent{

  private _MAX_PASS_LEN = 6;

  buttonpad : Array <number> = new Array(10);
  pass : string;

  constructor(){
    this.pass="";
  }
  pushPass(pass){
    if(this.pass.length <= this._MAX_PASS_LEN)
        this.pass+=pass;
  }

  cleanPass(){
    this.pass = "";
  }
}
