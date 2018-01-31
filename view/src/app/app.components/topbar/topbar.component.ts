import { Component, Input } from '@angular/core';
import { AuthService } from '../../app.services/auth.service';
import { NavbarService } from '../../app.services/navbar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopBarComponent {
  @Input() sidenav;
  constructor(public authService: AuthService, public navBarService: NavbarService) { }
}
