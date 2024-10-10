import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService } from '../../../../../services/category.service';

@Component({
  selector: 'app-stats-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-table.component.html',
})
export class StatsTableComponent {

  constructor(private readonly categoryService: CategoryService) {}
  stats$ = this.categoryService.getStats();
}
