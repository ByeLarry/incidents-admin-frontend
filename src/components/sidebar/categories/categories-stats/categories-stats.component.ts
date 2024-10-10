import { Component } from '@angular/core';
import { StatsTableComponent } from './stats-table/stats-table.component';

@Component({
  selector: 'app-categories-stats',
  standalone: true,
  imports: [StatsTableComponent],
  templateUrl: './categories-stats.component.html',
})
export class CategoriesStatsComponent {
}
