import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastComponent } from '../../../toast/toast.component';
import { CommonModule } from '@angular/common';
import { ToastService, UserService } from '../../../../libs/services';
import { UsersStatsDto } from '../../../../libs/dto';

@Component({
  selector: 'app-users-stats',
  standalone: true,
  imports: [ToastComponent, CommonModule],
  templateUrl: './users-stats.component.html',
})
export class UsersStatsComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  stats?: UsersStatsDto;

  constructor(
    private readonly toastService: ToastService,
    private readonly userService: UserService
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
    this.userService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
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
