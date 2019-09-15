import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkAuth();
  }

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkAuth();
  }

  private checkAuth() {
    if (!this.authService.authenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
