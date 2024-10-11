import { Injectable } from '@angular/core';
import { ToastComponent } from '../../components/toast/toast.component';
import { DEFAULT_TOAST_DURATION } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent: ToastComponent | null = null;

  registerToast(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  showToast(title: string, message: string, duration = DEFAULT_TOAST_DURATION) {
    if (this.toastComponent) {
      this.toastComponent.title = title;
      this.toastComponent.message = message;
      this.toastComponent.duration = duration;
      this.toastComponent.show();
    }
  }
}
