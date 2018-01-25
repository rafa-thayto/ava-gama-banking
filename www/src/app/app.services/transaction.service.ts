import { IAccount } from './../app.interfaces/account';
import { ITransaction } from './../app.interfaces/transaction';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class TransactionService {

    constructor(private _http: Http) { }

    getById(id: number) {

        return this._http.get(`http://localhost:3000/transactions/${id}`)
            .map((response: Response) => <ITransaction>response.json())
            .do(data => console.log('Dados: ' + JSON.stringify(data)))
            .catch(this.handleError);

    }

    filterTransactions() {
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

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
