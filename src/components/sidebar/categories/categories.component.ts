import { Component, OnInit } from '@angular/core';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { SidebarEnum } from '../../../libs/enums';
import { SIDEBAR_LOCAL_STORAGE_KEY } from '../../../libs/helpers';
import { IncidentsStatsComponent } from '../incidents-stats/incidents-stats.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesListComponent,
    CategoryCreateComponent,
    IncidentsStatsComponent,
  ],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem(SIDEBAR_LOCAL_STORAGE_KEY, SidebarEnum.CATEGORIES);
  }
}
