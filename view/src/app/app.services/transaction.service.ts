import { IAccount } from './../app.interfaces/account';
import { ITransaction } from './../app.interfaces/transaction';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface IRequest {
    ag: number;
    account_number: number;
    dateStart?: Date;
    dateEnd?: Date;
    valueStart?: number;
    valueEnd?: number;
    limit?: number;
    skip?: number;
}
@Injectable()
export class TransactionService {

    private endpoint: string = '/transactions'

    transactions: object[] = [];

    constructor(private _http: Http, public http: HttpClient) { }

    public find(options: Partial<IRequest>): Observable<ITransaction[]> {
        let params = new HttpParams();
        params = params.append("ag", options.ag.toString());
        params = params.append("account_number", options.account_number.toString());
        if (options.dateStart) {
            const date = options.dateStart;
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            params = params.append("dateStart", date.toISOString())
        };
        if (options.dateEnd) {
            const date = options.dateEnd;
            date.setHours(23);
            date.setMinutes(59);
            date.setSeconds(59);
            date.setMilliseconds(59);
            params = params.append("dateEnd", date.toISOString());
        }
        if (typeof options.valueStart === 'number') params = params.append("valueStart", options.valueStart.toString());
        if (typeof options.valueEnd === 'number') params = params.append("valueEnd", options.valueEnd.toString());
        if (options.limit) params = params.append("limit", options.limit.toString());
        if (options.skip) params = params.append("skip", options.skip.toString());
        return this.http.get<ITransaction[]>(`${environment.api.host}${this.endpoint}`, { params })
    }

    getById = (id: number) => this.http.get<ITransaction>(`${environment.api.host}${this.endpoint}/${id}`);

    createTransaction(request: Partial<ITransaction>): Observable<ITransaction> {
        return this.http.post<ITransaction>(`${environment.api.host}${this.endpoint}`, request)
    }

    filterTransactions(id: number) {
        return this._http.get(`http://localhost:3000/transactions/${id}`)
            .map((response: Response) => <ITransaction>response.json())
            .do(data => console.log('Dados: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    performTransaction(transaction: ITransaction) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http
            .post(`http://localhost:3000/accounts/${transaction.from.ag}/
            ${transaction.from.account_number}/transactions`,
            JSON.stringify(transaction), { headers: headers })
            .subscribe(() => {
                console.log('Sucesso');
            }, erro => {
                console.log(erro);
            });

    }


    advancedfilterTransactions(dateStart: Date, dateEnd: Date, valueStart: number,
        valueEnd: number, ag: number, account_number: number,
        clientName: String, type: String) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var stream = this._http.get(`http://localhost:3000/transactions/${dateStart}${dateEnd}
                                ${valueStart}${valueEnd}${ag}${account_number}${clientName}${type}`
            , { headers: headers })

        return stream.map((response: Response) => <ITransaction>response.json())
            .do(data => console.log('Dados: ' + JSON.stringify(data)))
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
