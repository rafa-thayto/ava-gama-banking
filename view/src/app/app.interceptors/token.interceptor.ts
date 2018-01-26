import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from '../app.services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  //TODO:remover isso daqui
  public get defaultHeaders(): HttpHeaders {
    const headers = new HttpHeaders({ authorization: `JWT ${localStorage.getItem('jwt')}` });
    return headers;
  }

  // constructor(private authService: AuthService) { }
  constructor() { }


  //https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("aqio")
    return next.handle(request);
    // return this.authService.token
    //   .do(() => console.log("aqui2"))
    //   .first()
    //   .do(() => console.log("aqui"))
    //   .map(token => request.clone({ setHeaders: { Authorization: `JWT ${token}` } }))
    //   .flatMap(request => next.handle(request));
  }

}
