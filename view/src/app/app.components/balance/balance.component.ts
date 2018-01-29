import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app.services/auth.service';

@Component({
  selector: 'balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {
  constructor(public authService: AuthService) {}
}
