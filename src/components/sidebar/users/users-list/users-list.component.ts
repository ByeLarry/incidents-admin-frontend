import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AllUsersService, ToastService } from '../../../../libs/services';
import { UserDto } from '../../../../libs/dto';
import { RolesEnum } from '../../../../libs/enums';
import { ToastComponent } from '../../../toast/toast.component';
import { BlockUserModalComponent } from '../../../modals/block-user/block-user.component';
import { UnblockUserModalComponent } from '../../../modals/unblock-user/unblock-user.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    BlockUserModalComponent,
    UnblockUserModalComponent,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  selectedUser?: UserDto;
  adminRole = RolesEnum.ADMIN;
  users$ = this.allUsersService.getUsersAsObservable();

  constructor(
    private readonly allUsersService: AllUsersService,
    private readonly toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  async copyToClipboard(id: string) {
    if (id) {
      await navigator.clipboard.writeText(id);
      this.toastService.showToast('Скопировано', 'ID пользователя скопировано');
    }
  }

  onSelectUser(data: UserDto) {
    this.selectedUser = { ...data };
  }
}
