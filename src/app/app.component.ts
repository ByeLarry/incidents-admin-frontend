import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Event,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoaderComponent } from '../components/loader/loader.component';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoading = false;
  constructor(
    private readonly router: Router,
    private readonly updates: SwUpdate
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });

    this.updates.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
