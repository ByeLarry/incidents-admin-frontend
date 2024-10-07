import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { SidebarEnum } from '../../enums/sidebar.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  sidebarEnum = SidebarEnum;
  constructor(public readonly sidebarService: SidebarService) {}

  selectCategoriesSection() {
    this.sidebarService.setCategoriesSection();
  }

  selectUsersSection() {
    this.sidebarService.setUsersSection();
  }

  selectPointsSection() {
    this.sidebarService.setPointsSection();
  }

  isCategoriesActive() {
    return this.sidebarService.state() === SidebarEnum.CATEGORIES;
  }

  isUsersActive() {
    return this.sidebarService.state() === SidebarEnum.USERS;
  }

  isPointsActive() {
    return this.sidebarService.state() === SidebarEnum.POINTS;
  }
}
