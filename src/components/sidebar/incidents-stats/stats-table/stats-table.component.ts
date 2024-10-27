import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryStatsDto } from '../../categories/dto';

@Component({
  selector: 'app-incidents-stats-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-table.component.html',
})
export class IncidentsStatsTableComponent {
  @Input() stats: CategoryStatsDto | undefined;
}
