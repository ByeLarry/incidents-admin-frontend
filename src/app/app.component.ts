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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoading = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });
  }
}
