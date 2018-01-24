import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IAccount } from '../app.interfaces/account'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class AccountService {
    private _Url = 'https://api.myjson.com/bins/rtba9';

    constructor(private _http: Http) { }
    
    getAccount(agencia: number, conta: number) : Observable<IAccount> {
        return this._http.get(this._Url)
            .map((response: Response) => <IAccount>response.json())
            .do(data => console.log('Dados: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}