import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService, ToastService } from '../../../libs/services';
import { ACCESS_TOKEN_KEY } from '../../../libs/helpers';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Router } from '@angular/router';
import { ToastComponent } from '../../toast/toast.component';
import { CommonModule } from '@angular/common';
import { SpinnerColorsEnum } from '../../../libs/enums';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [SpinnerComponent, ToastComponent, CommonModule],
  templateUrl: './logout.component.html',
})
export class LogoutModalComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  submitting = false;
  spinnerColor = SpinnerColorsEnum.SUCCESS;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onLogout() {
    this.submitting = true;
    this.authService
      .logout()
      .subscribe({
        next: () => {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toastService.showToast(
            'Произошла ошибка',
            'Не удалось выйти из аккаунта'
          );
        },
      })
      .add(() => {
        this.submitting = false;
      });
  }
}
