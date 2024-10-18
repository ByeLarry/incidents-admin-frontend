import { Injectable, signal } from '@angular/core';
import { SidebarEnum } from '../enums/sidebar.enum';
import { SIDEBAR_LOCAL_STORAGE_KEY } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  state = signal<SidebarEnum>(SidebarEnum.CATEGORIES);

  constructor() {
    const sidebarState = localStorage.getItem(SIDEBAR_LOCAL_STORAGE_KEY);
    if (sidebarState) {
      this.state.set(sidebarState as SidebarEnum);
    }
  }

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
