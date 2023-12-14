import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch,  Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate{

  constructor(
    private authService:AuthService,
    private router: Router
    ) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => {
        if(!isAuthenticated){
          this.router.navigate(['./auth/login'])
        }
      })
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean >  {
    // console.log('Can Match');
    // console.log({route, state});
    // return true;
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean  | Observable<boolean> {
    // console.log('Can Activate');
    // console.log({route, segments})
    // return true;
    return this.checkAuthStatus();

  }
}
