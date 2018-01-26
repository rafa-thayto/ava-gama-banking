import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../app.services/auth.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService){}
  //TODO: add redirect
  canActivate = (): Observable<boolean> => this.authService.isAuthenticated();
}
