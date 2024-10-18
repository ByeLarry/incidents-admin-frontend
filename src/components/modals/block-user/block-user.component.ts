import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {
  AllUsersService,
  AuthService,
  ToastService,
} from '../../../libs/services';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastComponent } from '../../toast/toast.component';
import { CommonModule } from '@angular/common';
import { SpinnerColorsEnum } from '../../../libs/enums';
import { UserDto } from '../../../libs/dto';

@Component({
  selector: 'app-block-user-modal',
  standalone: true,
  imports: [SpinnerComponent, ToastComponent, CommonModule],
  templateUrl: './block-user.component.html',
})
export class BlockUserModalComponent implements AfterViewInit {
  @Input() user?: UserDto;
  @ViewChild('toast')
  toastComponent!: ToastComponent;
  submitting = false;
  spinnerColor = SpinnerColorsEnum.SUCCESS;

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly allUsersService: AllUsersService
  ) {}

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onBLock() {
    this.submitting = true;
    this.authService
      .blockUser({ id: this.user!.id })
      .subscribe({
        next: () => {
          this.allUsersService.refetch();
        },
        error: () => {
          this.toastService.showToast(
            'Произошла ошибка',
            'Не удалось заблокировать пользователя'
          );
        },
      })
      .add(() => {
        this.submitting = false;
      });
  }
}
