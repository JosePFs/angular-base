import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from 'src/app/core/components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [RouterModule, CommonModule, BrowserModule, HttpClientModule, BrowserAnimationsModule],
  exports: [NotFoundComponent, CommonModule]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
