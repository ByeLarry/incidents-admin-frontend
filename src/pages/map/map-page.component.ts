import { Component } from '@angular/core';
import { MapComponent } from '../../components/sidebar/points/map/map.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './map-page.component.html',
})
export class MapPageComponent {}
