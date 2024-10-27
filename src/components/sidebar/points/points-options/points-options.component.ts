import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-points-options',
  standalone: true,
  imports: [RouterLink, NgbTooltipModule],
  templateUrl: './points-options.component.html',
})
export class PointsOptionsComponent {
}
