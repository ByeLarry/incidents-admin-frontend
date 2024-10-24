import { Component } from '@angular/core';

@Component({
  selector: 'app-points-stats',
  standalone: true,
  imports: [],
  templateUrl: './points-stats.component.html',
})
export class PointsStatsComponent {
  onRefreshClick() {
    console.log('onRefreshClick');
  }
}
