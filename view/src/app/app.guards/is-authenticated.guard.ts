import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../app.services/auth.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  //TODO: add redirect
  canActivate = (): Observable<boolean> => {
    return this.authService
      .token
      .map(token => !!token)
      .do(isAuthenticated => {
        if(!isAuthenticated) this.router.navigateByUrl('/login');
      })
  };
}
