import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastService, UserListService } from '../../../../libs/services';
import { UserDto } from '../../../../libs/dto';
import { RolesEnum } from '../../../../libs/enums';
import { ToastComponent } from '../../../toast/toast.component';
import { BlockUserModalComponent } from '../../../modals/block-user/block-user.component';
import { UnblockUserModalComponent } from '../../../modals/unblock-user/unblock-user.component';
import { DeleteUserModalComponent } from '../../../modals/delete-user/delete-user.component';
import { UsersPaginationComponent } from './users-pagination/users-pagination.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    BlockUserModalComponent,
    UnblockUserModalComponent,
    DeleteUserModalComponent,
    UsersPaginationComponent,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  selectedUser?: UserDto;
  adminRole = RolesEnum.ADMIN;
  users$ = this.userListService.getUsersAsObservable();

  constructor(
    private readonly userListService: UserListService,
    private readonly toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  async copyToClipboard(id: string) {
    if (id) {
      await navigator.clipboard.writeText(id);
      this.toastService.showToast('Скопировано', 'ID пользователя скопирован');
    }
  }

  onSelectUser(data: UserDto) {
    this.selectedUser = { ...data };
  }
}
