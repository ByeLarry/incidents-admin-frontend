import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  YMapControlDirective,
  YMapControlsDirective,
} from 'angular-yandex-maps-v3';

@Component({
  selector: 'app-map-controls',
  standalone: true,
  imports: [YMapControlsDirective, YMapControlDirective, RouterLink],
  templateUrl: './controls.component.html',
})
export class ControlsComponent {}
