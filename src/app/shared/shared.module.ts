import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavContentDirective } from './sidenav/sidenav-content.directive';
import { SidenavPanelDirective } from './sidenav/sidenav-panel.directive';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarActionsDirective } from './toolbar/toolbar-actions.directive';
import { ToolbarTitleDirective } from './toolbar/toolbar-title.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    ToolbarActionsDirective,
    ToolbarTitleDirective,
    SidenavPanelDirective,
    SidenavContentDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ToolbarComponent,
    ToolbarActionsDirective,
    ToolbarTitleDirective,
    SidenavComponent,
    SidenavPanelDirective,
    SidenavContentDirective
  ]
})
export class SharedModule {}
