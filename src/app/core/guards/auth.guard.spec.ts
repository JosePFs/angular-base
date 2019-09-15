import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterStub } from 'src/app/core/stubs/router.stub';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        AuthGuard,
        AuthService
      ]
    });
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should can load when logged in', inject(
    [AuthGuard, AuthService],
    (guard: AuthGuard, authService: AuthService) => {
      authService.authenticated = true;
      expect(guard.canLoad()).toBe(true);
    }
  ));

  it('should can not load when not logged in', inject(
    [AuthGuard, AuthService],
    (guard: AuthGuard, authService: AuthService) => {
      authService.authenticated = false;
      expect(guard.canLoad()).toBe(false);
    }
  ));

  it('should can activate when logged in', inject(
    [AuthGuard, AuthService],
    (guard: AuthGuard, authService: AuthService) => {
      authService.authenticated = true;
      expect(guard.canActivate()).toBe(true);
    }
  ));

  it('should can not activate when not logged in', inject(
    [AuthGuard, AuthService],
    (guard: AuthGuard, authService: AuthService) => {
      authService.authenticated = false;
      expect(guard.canActivate()).toBe(false);
    }
  ));
});
