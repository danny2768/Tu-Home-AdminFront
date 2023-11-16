import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean {

    if ( !this.authService.authStatus() ) this.router.navigateByUrl('/')
    return this.authService.authStatus()
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean{
    // console.log('Can Match');
    // console.log({ route, segments });

    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // console.log('Can Activate');
    // console.log({ route, state });

    return this.checkAuthStatus();
  }


}
