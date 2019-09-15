import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Authentication } from 'src/app/core/interfaces/authentication';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  function setup() {
    const service: AuthService = TestBed.get(AuthService);
    const httpTestingController: HttpTestingController = TestBed.get(
      HttpTestingController
    );
    const authUrlResponse: Authentication = {
      username: environment.username,
      password: environment.password
    };
    return { service, httpTestingController, authUrlResponse };
  }

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('should be able to authenticate', () => {
    const { service, httpTestingController, authUrlResponse } = setup();
    expect(service.authenticated).toBe(false);
    service
      .authenticate({
        username: environment.username,
        password: environment.password
      })
      .subscribe((data: boolean) => {
        expect(data).toBe(true);
      });

    const request = httpTestingController.expectOne(environment.authUrl);
    expect(request.request.method).toBe('GET');
    request.flush(authUrlResponse);
  });

  it('should not be able to authenticate', () => {
    const { service, httpTestingController, authUrlResponse } = setup();
    expect(service.authenticated).toBe(false);
    service
      .authenticate({ username: '', password: '' })
      .subscribe((data: boolean) => {
        expect(data).toBe(false);
      });

    const request = httpTestingController.expectOne(environment.authUrl);
    expect(request.request.method).toBe('GET');
    request.flush(authUrlResponse);
  });

  it('should be thrown an exception', () => {
    const { service, httpTestingController } = setup();
    expect(service.authenticated).toBe(false);
    service
      .authenticate({ username: '', password: '' })
      .subscribe((data: boolean) => {
        expect(data).toBe(false);
      });

    const request = httpTestingController.expectOne(environment.authUrl);
    expect(request.request.method).toBe('GET');
    request.flush({ username: '', password: '' });
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });
});
