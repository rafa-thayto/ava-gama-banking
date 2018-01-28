import { Injectable } from '@angular/core';
import { IAccount } from '../app.interfaces/account';
import { IClient } from '../app.interfaces/client';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { ClientService } from './client.service';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/from';
import { environment } from '../../environments/environment';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TokenInterceptor } from '../app.interceptors/token.interceptor';

//TODO: mover interface
interface IToken { token: string }

@Injectable()
export class AuthService {
  private endpoint: string = '/auth';
  private _account: IAccount;
  private _client: IClient;
  private _token: string;

  public token: ReplaySubject<string>;
  public isLogged: Observable<boolean>;
  public account: ReplaySubject<IAccount>;
  public client: ReplaySubject<IClient>;

  private onTokenChange(token: string) {
    this._token = token;
    this.tokenService.token = token;
    if (typeof token !== 'string') {
      this.client.next(null);
      this.account.next(null);
    } else {
      this.clientService.getClientInfo().first().subscribe(client => {
        this.client.next(client);
        this.account.next(client.accounts[0]);
      });
    }
  }

  private initListeners() {
    this.account.subscribe(account => this._account = account);
    this.client.subscribe(client => this._client = client);
    this.token.subscribe(this.onTokenChange.bind(this));
  }
  private initToken() {
    let token: string = this.tokenService.token;
    if (typeof token !== 'string') token = null;
    this.token.next(token);
  }

  constructor(public http: HttpClient, private clientService: ClientService, private tokenService: TokenInterceptor) {
    //TODO: behaviorSUbject with default null?
    this.account = new ReplaySubject(1);
    this.client = new ReplaySubject(1);
    this.token = new ReplaySubject(1);
    this.isLogged = this.token.map(token => token ? true : false);
    this.isLogged.subscribe(isLogged => console.log("isLogged ? ", isLogged))
    this.initListeners();
    this.initToken();
  }

  public login = (cpf: number, password: string): Observable<boolean> =>
    this.http
      .post<IToken>(`${environment.api.host}${this.endpoint}/login`, { cpf, password })
      .do(res => this.token.next(res.token))
      .map(() => true);

  public logout = (): Observable<boolean> => Observable.from([true]).do(() => this.token.next(null)).mapTo(true)

  public isAuthenticated = (): Observable<boolean> =>
    this.http
      .get(`${environment.api.host}${this.endpoint}/isTokenValid`)
      .map(() => true);
}
