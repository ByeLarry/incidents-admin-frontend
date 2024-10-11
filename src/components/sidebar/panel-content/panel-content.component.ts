import { Component } from '@angular/core';

import { CategoriesComponent } from '../categories/categories.component';
import { UsersComponent } from '../users/users.component';
import { CommonModule } from '@angular/common';
import { PointsComponent } from '../points/points.component';
import { SidebarService } from '../../../libs/services';
import { SidebarEnum } from '../../../libs/enums';

@Component({
  selector: 'app-panel-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-content.component.html',
})
export class PanelContentComponent {
  constructor(private readonly sidebarService: SidebarService) {}

  getContentComponent() {
    switch (this.sidebarService.state()) {
      case SidebarEnum.CATEGORIES:
        return CategoriesComponent;
      case SidebarEnum.USERS:
        return UsersComponent;
      case SidebarEnum.POINTS:
        return PointsComponent;
      default:
        return CategoriesComponent;
    }
  }
}
