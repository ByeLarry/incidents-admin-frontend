import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StatsTableComponent } from './stats-table/stats-table.component';
import { ToastComponent } from '../../../toast/toast.component';
import { CategoryService, ToastService } from '../../../../libs/services';
import { CategoryStatsDto } from '../dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-stats',
  standalone: true,
  imports: [StatsTableComponent, ToastComponent, CommonModule],
  templateUrl: './categories-stats.component.html',
})
export class CategoriesStatsComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  stats: CategoryStatsDto | undefined;
  categoriesCount = 0;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
    this.updateStats();
  }

  onRefreshClick() {
    this.stats = undefined;
    this.updateStats();
  }

  private updateStats() {
    this.categoryService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.categoriesCount = this.categoryService.getCategoriesLength();
      },
      error: () => {
        this.toastService.showToast(
          'Ошибка',
          'Ошибка при обновлении статистики'
        );
      },
    });
  }
}
