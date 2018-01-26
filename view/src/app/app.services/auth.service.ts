import { Injectable } from '@angular/core';
import { IAccount } from '../app.interfaces/account';
import { IClient } from '../app.interfaces/client';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { AccountService } from './account.service';
import { ClientService } from './client.service';
import 'rxjs/add/operator/first';
import { environment } from '../../environments/environment';

//TODO: mover interface
interface IToken { token: string }

@Injectable()
export class AuthService {
  private endpoint: string = '/auth';
  private _account: IAccount;
  private _client: IClient;
  private _token: string;

  public token: ReplaySubject<string>;
  public account: ReplaySubject<IAccount>;
  public client: ReplaySubject<IClient>;

  private onTokenChange(token: string) {
    this._token = token;
    if (typeof token !== 'string') return;
    //TODO: remover os parametros do getAccount
    this.accountService.getAccount(1, 2).first().subscribe(account => {
      this.client.next(account.client);
      this.account.next(account);
    });
  }

  private initListeners() {
    this.account.subscribe(account => this._account = account);
    this.client.subscribe(client => this._client = client);
    this.token.subscribe(this.onTokenChange);
  }
  private captureLocalToken() {
    let token: string = localStorage.getItem('jwt');
    if (typeof token !== 'string') this.token.next(null);
    else this.token.next(token);
  }

  constructor(private http: HttpClient, private accountService: AccountService) {
    //TODO: behaviorSUbject with default null?
    this.account = new ReplaySubject(1);
    this.client = new ReplaySubject(1);
    this.token = new ReplaySubject(1);
    this.initListeners();
    this.captureLocalToken();
  }
  //TODO: mover url da api para envioriment
  public login = (agency: number, account: number, password: string): Observable<boolean> =>
    this.http
      .post<IToken>(`${environment.api.host}${this.endpoint}/login`, { agency, account, password })
      .do(res => this.token.next(res.token))
      .map(() => true);

  public isAuthenticated = (): Observable<boolean> =>
    this.http.get(`${environment.api.host}${this.endpoint}/isTokenValid`).map(() => true);

}
