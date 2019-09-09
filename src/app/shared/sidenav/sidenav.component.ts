import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { SidenavContentDirective } from 'src/app/shared/sidenav/sidenav-content.directive';
import { SidenavPanelDirective } from 'src/app/shared/sidenav/sidenav-panel.directive';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
  @Input() mode = 'over';
  @Input() role = 'navigation';

  @ContentChild(SidenavPanelDirective, { read: TemplateRef, static: false })
  sidenavPanel!: SidenavPanelDirective;
  @ContentChild(SidenavContentDirective, { read: TemplateRef, static: false })
  sidenavContent!: SidenavContentDirective;

  constructor() {}
}
