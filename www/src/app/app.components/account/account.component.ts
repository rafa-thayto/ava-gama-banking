import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AccountService } from "../../app.services/account.service"
import { IAccount } from "../../app.interfaces/account"

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	account: IAccount;
  ag: number;
  account_number: number;
    
    constructor(private _accountService: AccountService) {}

    MostrarAccount(): void {
        this._accountService.getAccount(this.ag, this.account_number)
            .subscribe((data: IAccount) => this.account = data,
            error => console.log(error));
    }

  ngOnInit() {
  }

}
