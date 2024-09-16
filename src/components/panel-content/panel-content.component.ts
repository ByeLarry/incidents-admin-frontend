import { Component, ComponentFactoryResolver } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-panel-content',
  standalone: true,
  imports: [],
  templateUrl: './panel-content.component.html',
  styleUrl: './panel-content.component.scss',
})
export class PanelContentComponent {
  constructor(private readonly sidebarService: SidebarService) {}
}
