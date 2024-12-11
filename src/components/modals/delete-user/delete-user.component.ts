import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastComponent } from '../../toast/toast.component';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../../libs/dto';
import { SpinnerColorsEnum } from '../../../libs/enums';
import {
  ToastService,
  UserListService,
  UserService,
} from '../../../libs/services';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [SpinnerComponent, ToastComponent, CommonModule],
  templateUrl: './delete-user.component.html',
})
export class DeleteUserModalComponent implements AfterViewInit, OnChanges {
  @ViewChild('toast') toastComponent!: ToastComponent;
  @Input() user?: UserDto;
  deletableUser?: UserDto;
  submitting = false;
  spinnerColor = SpinnerColorsEnum.DANGER;

  constructor(
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly userListServie: UserListService
  ) {}

  ngOnChanges(): void {
    if (!this.user) {
      return;
    }
    this.deletableUser = { ...this.user };
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onDelete() {
    this.submitting = true;

    if (!this.user) return;

    this.userService
      .deleteUser(this.user.id)
      .subscribe({
        next: () => {
          this.toastService.showToast('Успех', 'Пользователь удален');
          this.userListServie.refetchPaginatedUsers();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict)
            this.toastService.showToast(
              'Произошла ошибка',
              'Администратор не может быть удален'
            );
          else
            this.toastService.showToast(
              'Произошла ошибка',
              'Не удалось удалить пользователя'
            );
        },
      })
      .add(() => {
        this.submitting = false;
      });
  }
}
