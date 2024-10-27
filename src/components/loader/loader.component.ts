import { Component } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerColorsEnum } from '../../libs/enums';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader">
      <app-spinner [color]="spinerColor" [growing]="true"></app-spinner>
    </div>
  `,
  standalone: true,
  imports: [SpinnerComponent],
  styles: [
    `
      .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);
        font-size: 24px;
        z-index: 1000;
      }
    `,
  ],
})
export class LoaderComponent {
  spinerColor = SpinnerColorsEnum.PRIMARY;
}
