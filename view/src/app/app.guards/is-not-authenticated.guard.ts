import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../app.services/auth.service';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    return this.authService
      .isLogged
      .do(isLogged => {
        if(isLogged) {
          console.log("going to home")
          this.router.navigateByUrl('/');
        }
      })
  }
}
