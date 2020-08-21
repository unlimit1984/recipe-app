import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Option 1
    // return this.authService.user
    //   .pipe(
    //     take(1),
    //     map(user => !!user),
    //     tap(isAuth => {
    //       if (!isAuth) {
    //         this.router.navigate(['/auth']);
    //       }
    //     }));

    // Option 2 (modern approach)
    return this.authService.user
      .pipe(
        take(1),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          } else {
            return this.router.createUrlTree(['/auth']);
          }
        }));
  }

}
