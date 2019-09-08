import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Authentication } from 'src/app/core/interfaces/authentication';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated = false;

  constructor(private readonly http: HttpClient) {}

  authenticate(body: Authentication): Observable<any> {
    return this.http.post(environment.apiUrl, body).pipe(
      tap((response: any) => {
        if (response.authentication) {
          this.authenticated = true;
        }
      })
    );
  }

  set authenticated(state: boolean) {
    this._authenticated = state;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }
}
