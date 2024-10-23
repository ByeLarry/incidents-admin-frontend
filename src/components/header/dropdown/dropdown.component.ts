import { Component, OnInit, Signal } from '@angular/core';
import { LogoutModalComponent } from '../../modals/logout/logout.components';
import { UpdateCurrentUserComponent } from '../../modals/update-current-user/update-current-user.component';
import { UserService } from '../../../libs/services';
import { UserDto } from '../../../libs/dto';
import { CreateAdminModalComponent } from '../../modals/add-admin/add-admin.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    LogoutModalComponent,
    UpdateCurrentUserComponent,
    CreateAdminModalComponent,
  ],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  user!: Signal<UserDto | null>;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.user;
  }
}
