import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [HomeRoutingModule, SharedModule]
})
export class HomeModule {}
