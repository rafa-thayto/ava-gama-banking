import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app.services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public maskAgencia = [ /[1-9]/, /\d/, /\d/,/\d/]

  public maskConta = [ /[1-9]/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/]


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.login(1,5,"000005").subscribe(d => console.log(d))
  }

}
