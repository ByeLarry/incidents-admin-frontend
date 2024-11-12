import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  YMapControlDirective,
  YMapControlsDirective,
} from 'angular-yandex-maps-v3';
import { MapSearchComponent } from './search/search.component';
import { MarkSearchDto } from '../../../../../libs/dto';

@Component({
  selector: 'app-map-controls',
  standalone: true,
  imports: [
    YMapControlsDirective,
    YMapControlDirective,
    RouterLink,
    MapSearchComponent,
  ],
  templateUrl: './controls.component.html',
})
export class ControlsComponent {
  @Output() markSelected = new EventEmitter<MarkSearchDto>();
}
