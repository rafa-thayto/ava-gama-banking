import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../app.services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  //https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
  intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> =>
    this.authService.token
      .first()
      .map(token => request.clone({ setHeaders: { Authorization: `JWT ${token}` } }))
      .flatMap(request => next.handle(request));

}
