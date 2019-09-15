import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterStub } from 'src/app/core/stubs/router.stub';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let authServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [{ provide: Router, useClass: RouterStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to click submit login', () => {
    authServiceSpy = spyOn(authService, 'authenticate')
      .and.callThrough()
      .and.returnValue(of(true));

    component.loginForm.setValue({
      username: environment.username,
      password: 'password'
    });

    debugElement
      .query(By.css('.login__form'))
      .triggerEventHandler('submit', null);

    expect(component.authenticationFailed).toBe(false);
    expect(authServiceSpy).toHaveBeenCalled();
  });

  it('should be able to fail submit login', () => {
    authServiceSpy = spyOn(authService, 'authenticate').and.returnValue(
      of(false)
    );

    component.loginForm.setValue({
      username: environment.username,
      password: environment.password
    });

    debugElement
      .query(By.css('.login__form'))
      .triggerEventHandler('submit', null);

    expect(component.authenticationFailed).toBe(true);
    expect(authServiceSpy).toHaveBeenCalled();
  });

  it('should not be able to submit invalid form', () => {
    authServiceSpy = spyOn(authService, 'authenticate');

    component.loginForm.setValue({
      username: '',
      password: ''
    });

    debugElement
      .query(By.css('.login__form'))
      .triggerEventHandler('submit', null);

    expect(authServiceSpy).not.toHaveBeenCalled();
  });
});
