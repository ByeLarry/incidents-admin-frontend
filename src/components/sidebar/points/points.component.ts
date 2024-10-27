import { Component, OnInit } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SIDEBAR_LOCAL_STORAGE_KEY } from '../../../libs/helpers';
import { SidebarEnum } from '../../../libs/enums';
import { Observable } from 'rxjs';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import { toObservable } from '@angular/core/rxjs-interop';
import { PointsService } from '../../../libs/services';
import { PointsOptionsComponent } from './points-options/points-options.component';
import { IncidentsStatsComponent } from '../incidents-stats/incidents-stats.component';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [MapComponent, PointsOptionsComponent, IncidentsStatsComponent],
  templateUrl: './points.component.html',
})
export class PointsComponent implements OnInit {
  points$!: Observable<Feature[]>;
  points: Feature[] = [];

  constructor(private readonly pointsService: PointsService) {
    this.points$ = toObservable(this.pointsService.points);
    this.points$.subscribe((data) => {
      this.points = data;
    });
  }

  ngOnInit(): void {
    localStorage.setItem(SIDEBAR_LOCAL_STORAGE_KEY, SidebarEnum.POINTS);
  }
}
