import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerColorsEnum } from '../../libs/enums';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() growing = false;
  @Input() color: SpinnerColorsEnum = SpinnerColorsEnum.PRIMARY;
}
