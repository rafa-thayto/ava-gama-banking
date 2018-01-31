import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app.services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.logout().first().subscribe(() => this.router.navigateByUrl('/login'));
  }
}
