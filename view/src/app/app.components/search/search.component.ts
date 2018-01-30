import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TransactionService, IRequest } from '../../app.services/transaction.service';
import { NavbarService } from '../../app.services/navbar.service';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../app.services/auth.service';
import { ITransaction } from '../../app.interfaces/transaction';

import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public dateStart: Date;
  public dateEnd: Date = new Date();
  public valueStart: number;
  public valueEnd: number;
  // clienteName: String;
  // typeAccount: String;
  // error: String;

  public subscription: Subscription;
  public loading: boolean = true;
  public transactions: ITransaction[] = [];
  public inputWatcher: ReplaySubject<Partial<IRequest>>;

  constructor(private transactionService: TransactionService, public authService: AuthService) {
    this.inputWatcher = new ReplaySubject(1);
    const accountObs = this.authService.account;
    this.subscription = Observable.combineLatest(accountObs, this.inputWatcher)
      .do(() => this.loading = true)
      .map(data => {
        let options: Partial<IRequest> = data[1]
        options.ag = data[0].ag;
        options.account_number = data[0].account_number;
        console.log(options)
        return options;
      })
      .flatMap(request => this.transactionService.find(request).first())
      .do(() => this.loading = false)
      .subscribe(
        transactions => this.transactions = transactions,
        error => console.log(error)
      )
    this.filtrar();
  }

  filtrar() {
    console.log(this.valueEnd)
    const options: Partial<IRequest> = {
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      valueStart: this.valueStart,
      valueEnd: this.valueEnd
    };
    this.inputWatcher.next(options);
  }

  ngOnDestroy() {
    if (!this.subscription.closed) this.subscription.unsubscribe();
  }

}
