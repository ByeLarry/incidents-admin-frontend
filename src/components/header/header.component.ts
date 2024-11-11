import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ClearCacheComponent } from './clear-cache/clear-cache.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, DropdownComponent, ClearCacheComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
