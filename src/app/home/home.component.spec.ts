import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from 'src/app/home/footer/footer.component';
import { HeaderComponent } from 'src/app/home/header/header.component';
import { MainComponent } from 'src/app/home/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent
      ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create home', () => {
    expect(component).toBeTruthy();
  });

  it('should insert dashboard link', () => {
    expect(
      fixture.debugElement.query(By.css('.header__dashboard-link'))
        .nativeElement.textContent
    ).toContain('Dashboard');
  });
});
