import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app.services/auth.service';
import { NavbarService } from '../../../app.services/navbar.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // public maskAgencia = [ /[1-9]/, /\d/, /\d/,/\d/]

  public maskCpf = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(private authService: AuthService, public navbarService: NavbarService) {
    // hideToolbar()
    this.navbarService.hide();
  }

  ngOnInit() {
    // this.authService.login(1,5,"000005").subscribe(d => console.log(d))
  }

  ngOnDestroy(){
   this.navbarService.show();
  }

}
