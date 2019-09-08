import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from 'src/app/home/footer/footer.component';
import { HeaderComponent } from 'src/app/home/header/header.component';
import { MainComponent } from 'src/app/home/main/main.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
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

  it('should render dashboard link', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.content a.main__dashboard-link').textContent
    ).toContain('Dashboard');
  });
});
