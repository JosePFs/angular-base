import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { HomeComponent } from 'src/app/home/home.component';
import { HomeModule } from 'src/app/home/home.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let libraryService: LibraryService;

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
      providers: [AuthService, LibraryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    libraryService = debugElement.injector.get(LibraryService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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

  it('should be able to click add and remove book', () => {
    const componentSpyAdd = spyOn(component, 'addBook').and.callThrough();
    const componentSpyRemove = spyOn(component, 'removeBook').and.callThrough();

    libraryService.setSize(1, 1);
    component.addBookForm.setValue({ title: '0', author: '0', size: 1 });

    debugElement.query(By.css('.form')).triggerEventHandler('submit', null);
    fixture.detectChanges();

    debugElement
      .query(By.css('.more-button'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();

    debugElement.query(By.css('.remove-book')).triggerEventHandler('click', 0);
    fixture.detectChanges();

    expect(componentSpyAdd).toHaveBeenCalled();
    expect(componentSpyRemove).toHaveBeenCalled();
  });

  it('should be able to add and remove books', () => {
    const componentSpyAdd = spyOn(component, 'addBook').and.callThrough();
    const componentSpyRemove = spyOn(component, 'removeBook').and.callThrough();

    libraryService.setSize(1, 1);
    component.addBookForm.setValue({ title: '0', author: '0', size: 1 });

    component.addBook();
    component.removeBook(0);
    expect(componentSpyAdd).toHaveBeenCalled();
    expect(componentSpyRemove).toHaveBeenCalled();
  });

  it('should be able to set sizes', () => {
    const componentSpySetSizes = spyOn(component, 'setSizes').and.callThrough();

    component.sizesForm.setValue({ shelfSize: 5, shelvesSize: 5 });

    debugElement
      .query(By.css('.form-sizes'))
      .triggerEventHandler('submit', null);
    fixture.detectChanges();

    expect(componentSpySetSizes).toHaveBeenCalled();
  });

  it('should be able to search', () => {
    const componentSpySearchBook = spyOn(
      component,
      'searchBook'
    ).and.callThrough();

    component.searchForm.setValue({ search: 'a' });

    debugElement
      .query(By.css('.form-search'))
      .triggerEventHandler('submit', null);
    fixture.detectChanges();

    expect(componentSpySearchBook).toHaveBeenCalled();
  });
});
