import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // private _token: string;

  public get token(): string {
    //FIXIT: localstorage pois é instanciado dois providers, gerando _token com dois valores diferentes.
    // if (!this._token) this._token = localStorage.getItem('jwt');
    // return this._token;
    return localStorage.getItem('jwt');;
  }

  public set token(token: string) {
    if (!token) {
      // this._token = null;
      localStorage.removeItem('jwt');
    } else {
      // this._token = token;
      localStorage.setItem('jwt', token);
    }
  }

  constructor(private router: Router) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if ([401, 403].indexOf(err.status) > -1) {
      this.router.navigateByUrl('/logout');
      return Observable.of(err.message);
    }
    return Observable.throw(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ setHeaders: { Authorization: `JWT ${this.token}` } });
    return next.handle(request).catch(err => this.handleAuthError(err));
  }

}
