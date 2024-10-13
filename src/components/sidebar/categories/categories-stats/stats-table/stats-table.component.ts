import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryStatsDto } from '../../dto';

@Component({
  selector: 'app-stats-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-table.component.html',
})
export class StatsTableComponent {
  @Input() stats: CategoryStatsDto | undefined;
}
