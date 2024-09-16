import { Injectable, signal } from '@angular/core';
import { SidebarEnum } from '../enums/sidebar.enum';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarState = signal<SidebarEnum>(SidebarEnum.CATEGORIES);

  get state() {
    return this.sidebarState();
  }

  setCategoriesSection() {
    this.sidebarState.set(SidebarEnum.CATEGORIES);
  }

  setUsersSection() {
    this.sidebarState.set(SidebarEnum.USERS);
  }

  setPointsSection() {
    this.sidebarState.set(SidebarEnum.POINTS);
  }
}
