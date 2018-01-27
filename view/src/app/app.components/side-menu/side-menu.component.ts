import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IClient } from '../../app.interfaces/client';
import { IAccount } from '../../app.interfaces/account';
import { AuthService } from '../../app.services/auth.service';
import { Observable } from 'rxjs/Observable';
import { NavbarService } from '../../app.services/navbar.service'
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public client: Observable<IClient>;
  public account: Observable<IAccount>;
  
  constructor(private authService: AuthService, public navBarService: NavbarService, private router: Router) {
    this.account = this.authService.account;
    this.client = this.authService.client;
  }

  ngOnInit() {
  }

}
