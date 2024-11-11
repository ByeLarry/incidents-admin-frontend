import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../../libs/services';
import { ClearCacheCategoriesDirective } from '../../../directives/clear-cache/categories.directive';

@Component({
  selector: 'app-clear-cache-dropdown',
  standalone: true,
  imports: [ToastComponent, ClearCacheCategoriesDirective],
  templateUrl: './clear-cache.component.html',
})
export class ClearCacheComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;

  constructor(private readonly toastService: ToastService) {}

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }
}
