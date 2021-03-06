import { Router } from '@angular/router';
import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { IClient } from '../../app.interfaces/client';
import { IAccount } from '../../app.interfaces/account';
import { AuthService } from '../../app.services/auth.service';
import { Observable } from 'rxjs/Observable';
import { NavbarService } from '../../app.services/navbar.service'
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { FiltersService } from '../../app.services/filters.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements AfterViewInit {

  @ViewChild('sidenav') sidenav;
  @ViewChild('filternav') filternav;

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

  constructor(
    private authService: AuthService,
    public navBarService: NavbarService,
    private router: Router,
    public media: ObservableMedia,
    public filtersService: FiltersService) {
    this.account = this.authService.account;
    this.client = this.authService.client;
    this.media.asObservable().subscribe(this.onMediaChange.bind(this));
  }

  ngAfterViewInit(){
    this.filtersService.filternav = this.filternav;
  }

  fechar() {
    if (window.innerWidth <= 960) {
      this.sidenav.toggle()
    }
  }



}
