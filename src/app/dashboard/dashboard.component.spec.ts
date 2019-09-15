import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { HomeComponent } from 'src/app/home/home.component';
import { HomeModule } from 'src/app/home/home.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        HomeModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule.withRoutes([{ path: '', component: HomeComponent }])
      ],
      providers: [AuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have cards', () => {
    expect(component.cards).toBeTruthy();
  });

  it('should be able to click logout', () => {
    const componentSpy = spyOn(component, 'onLogout');

    debugElement
      .query(By.css('.dashboard__logout'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(componentSpy).toHaveBeenCalled();
  });

  it('should be able to logout', async(() => {
    fixture.ngZone.run(() => {
      authService.authenticated = true;
      component.onLogout();
      expect(authService.authenticated).toBe(false);
    });
  }));
});
