import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IClient } from '../app.interfaces/client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientService {

  private getQueryParams(agency: number, account: number): HttpParams {
    const params = new HttpParams();
    params.append('agency', agency.toString());
    params.append('account_number', account.toString());
    return params;
  }

  constructor(private http: HttpClient) { }

  public getClientInfoByAccount = (agency: number, account: number): Observable<Partial<IClient>> =>
    this.http.get<Partial<IClient>>('/clients/', { params: this.getQueryParams(agency, account) })
}
