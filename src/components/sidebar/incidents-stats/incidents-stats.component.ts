import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, ToastService } from '../../../libs/services';
import { ToastComponent } from '../../toast/toast.component';
import { CategoryStatsDto } from '../categories/dto';
import { IncidentsStatsTableComponent } from './stats-table/stats-table.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-incidents-stats',
  standalone: true,
  imports: [
    IncidentsStatsTableComponent,
    ToastComponent,
    CommonModule,
    NgbTooltipModule,
  ],
  templateUrl: './incidents-stats.component.html',
})
export class IncidentsStatsComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  @Input() withPointsTotal = false;
  @Input() withCategoriesTotal = false;
  stats?: CategoryStatsDto;
  categoriesCount = 0;
  pointsCount = 0;

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
        this.pointsCount = this.stats.incidents.reduce(
          (sum, incident) => sum + incident.incidentsCount,
          0
        );
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
