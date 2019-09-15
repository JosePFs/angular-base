import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Authentication } from 'src/app/core/interfaces/authentication';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;

  constructor(private readonly http: HttpClient) {}

  authenticate(credentials: Authentication): Observable<boolean> {
    return this.http.get(environment.authUrl).pipe(
      tap((data: Authentication) => {
        if (data.username === '' && data.password === '') {
          throw new Error('Authentication error');
        }
      }),
      catchError(err => of(false)),
      map((response: Authentication) => {
        if (
          response.username === credentials.username &&
          response.password === credentials.password
        ) {
          this.authenticated = true;
          return true;
        }
        this.authenticated = false;
        return false;
      })
    );
  }
}
