import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IClient } from '../../app.interfaces/client';
import { IAccount } from '../../app.interfaces/account';
import { AuthService } from '../../app.services/auth.service';
import { Observable } from 'rxjs/Observable';
import { NavbarService } from '../../app.services/navbar.service'
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public client: Observable<IClient>;
  public account: Observable<IAccount>;
  public sideMenuMode: string = 'push';
  public toolbarColor: string = 'primary';
  public sideMenuOpen: boolean = false;

  public onMediaChange = (media: MediaChange) => {
    const alias = media.mqAlias;
    const isSmall = ['xs', 'sm'].indexOf(alias) > -1;
    if (isSmall) {
      this.sideMenuMode = 'over'
      this.toolbarColor = 'primary';
      this.sideMenuOpen = false;
    } else {
      this.sideMenuMode = 'side'
      this.toolbarColor = 'transparent';
      this.sideMenuOpen = true;
    }
  }

  constructor(private authService: AuthService, public navBarService: NavbarService, private router: Router, public media: ObservableMedia) {
    this.account = this.authService.account;
    this.client = this.authService.client;
    this.media.asObservable().subscribe(this.onMediaChange.bind(this));
  }

}
