import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IClient } from '../app.interfaces/client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ClientService {

  private getQueryParams(agency: number, account: number): HttpParams {
    let params = new HttpParams();
    params = params.append('ag', agency.toString());
    params = params.append('account_number', account.toString());
    return params;
  }

  constructor(private http: HttpClient) { }

  public getClientInfo(): Observable<IClient>;
  public getClientInfo(agency: number, account: number): Observable<Partial<IClient>>;
  public getClientInfo(agency?: number, account?: number): Observable<Partial<IClient>> {
    const url = `${environment.api.host}/clients/`;
    if (agency && account)
      return this.http.get<Partial<IClient>>(url, { params: this.getQueryParams(agency, account) });
    else
      return this.http.get<Partial<IClient>>(url);
  }
}
