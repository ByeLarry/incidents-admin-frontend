import { Injectable, signal } from '@angular/core';
import { SidebarEnum } from '../enums/sidebar.enum';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  state = signal<SidebarEnum>(SidebarEnum.CATEGORIES);

  setCategoriesSection() {
    this.state.set(SidebarEnum.CATEGORIES);
  }

  setUsersSection() {
    this.state.set(SidebarEnum.USERS);
  }

  setPointsSection() {
    this.state.set(SidebarEnum.POINTS);
  }
}