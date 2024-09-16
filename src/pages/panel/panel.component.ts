import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PanelContentComponent } from '../../components/panel-content/panel-content.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, PanelContentComponent],
  templateUrl: './panel.component.html',
})
export class PanelComponent {}
