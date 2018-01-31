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
      .isLogged
      .first()
      .do(isLogged => {
        if(!isLogged) {
          console.log("going to login")
          this.router.navigateByUrl('/login');
        }
      })
  };
}
