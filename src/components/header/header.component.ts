import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, DropdownComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}
