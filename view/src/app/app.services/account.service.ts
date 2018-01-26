import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount } from '../app.interfaces/account'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { TokenInterceptor } from '../app.interceptors/token.interceptor';


@Injectable()
export class AccountService {
    private endpoint: string = '/accounts';

    constructor(public http: HttpClient, public tokenService: TokenInterceptor) { }


    getAccount(ag: number, account_number: number) : Observable<IAccount> {
        return this.http.get<IAccount>(`${environment.api.host}${this.endpoint}`, { headers: this.tokenService.defaultHeaders })
            // .map((response: Response) => <IAccount>response.json())
            // .do(data => console.log('Dados: ' + JSON.stringify(data)))
            // .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        // return Observable.throw(error.json().error || 'Server error');
    }
}
