import { Component } from '@angular/core';
import { LogoutModalComponent } from '../../modals/logout/logout.components';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [LogoutModalComponent],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {}
