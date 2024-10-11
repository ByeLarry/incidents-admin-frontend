import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_TOAST_DURATION } from '../../libs/helpers';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [CommonModule],
  standalone: true,
  styles: [
    `
      .toast {
        z-index: 1050;
      }
    `,
  ],
})
export class ToastComponent implements OnInit {
  @Input() title = 'Notification';
  @Input() message = 'This is a toast message.';
  @Input() duration = DEFAULT_TOAST_DURATION;

  isVisible = false;
  timestamp = '';

  ngOnInit(): void {
    this.timestamp = new Date().toLocaleTimeString();
  }

  show() {
    this.isVisible = true;
    setTimeout(() => {
      this.closeToast();
    }, this.duration);
  }

  closeToast() {
    this.isVisible = false;
  }
}
