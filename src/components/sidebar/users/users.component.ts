import { Component, OnInit } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { SidebarEnum } from '../../../libs/enums';
import { CurrentProfileComponent } from './current-profile/current-profile.component';
import { SIDEBAR_LOCAL_STORAGE_KEY } from '../../../libs/helpers';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersStatsComponent } from './users-stats/users-stats.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UsersListComponent,
    CurrentProfileComponent,
    CreateUserComponent,
    UsersStatsComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem(SIDEBAR_LOCAL_STORAGE_KEY, SidebarEnum.USERS);
  }
}
