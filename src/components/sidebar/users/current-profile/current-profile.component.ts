import { Component, OnInit, Signal } from '@angular/core';
import { UserService } from '../../../../libs/services';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../../../libs/dto';
import { LogoutModalComponent } from '../../../modals/logout/logout.components';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-current-profile',
  standalone: true,
  imports: [CommonModule, LogoutModalComponent, NgbTooltipModule],
  templateUrl: './current-profile.component.html',
})
export class CurrentProfileComponent implements OnInit {
  user!: Signal<UserDto | null>;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.user;
  }
}
