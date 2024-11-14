import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ClearCacheComponent } from './clear-cache/clear-cache.component';
import { SearchEngineReindexComponent } from './search-engine-reindex/search-engine-reindex.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    ProfileComponent,
    ClearCacheComponent,
    SearchEngineReindexComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
