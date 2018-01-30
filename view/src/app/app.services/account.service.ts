import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount } from '../app.interfaces/account'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AccountService {
    private endpoint: string = '/accounts';

    constructor(public http: HttpClient) { }

    getAccount(ag: number, account_number: number): Observable<IAccount> {
        if (typeof ag !== 'number') return Observable.throw("invalid agency");
        if (typeof account_number !== 'number') return Observable.throw("invalid account number");
        return this.http.get<IAccount>(`${environment.api.host}${this.endpoint}`)
    }
}
