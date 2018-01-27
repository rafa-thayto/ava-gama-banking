import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  public get token(): string {
    return localStorage.getItem('jwt');
  }
  public set token(token: string) {
    if (!token) localStorage.removeItem('jwt')
    else localStorage.setItem('jwt', token);
  }

  constructor(private router: Router) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/logout`);
      return Observable.of(err.message);
    }
    return Observable.throw(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ setHeaders: { Authorization: `JWT ${this.token}` } });
    return next.handle(request).catch(err => this.handleAuthError(err));
  }

}
