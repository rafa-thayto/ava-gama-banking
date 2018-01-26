import { Component, OnInit } from '@angular/core';
import { IClient } from '../../app.interfaces/client';
import { IAccount } from '../../app.interfaces/account';
import { AuthService } from '../../app.services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  public client: Observable<IClient>;
  public account: Observable<IAccount>;

  constructor(private authService: AuthService) {
    this.account = this.authService.account;
    this.client = this.authService.client;
  }

  ngOnInit() {
  }

}
