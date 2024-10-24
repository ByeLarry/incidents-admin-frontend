import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LngLat, YMapProps } from '@yandex/ymaps3-types';
import {
  YApiLoaderService,
  YMapClustererDirective,
  YMapComponent,
  YMapDefaultFeaturesLayerDirective,
  YMapDefaultSchemeLayerDirective,
} from 'angular-yandex-maps-v3';
import { Observable, Subscription } from 'rxjs';
import { MapConsts } from '../../../../libs/helpers';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import {
  CurrentLocationService,
  PointsService,
} from '../../../../libs/services';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { IncidentModalComponent } from '../../../modals/incident/incident.component';
import { ControlsComponent } from './controls/controls.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    YMapComponent,
    YMapDefaultSchemeLayerDirective,
    YMapDefaultFeaturesLayerDirective,
    YMapClustererDirective,
    CommonModule,
    IncidentModalComponent,
    ControlsComponent,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnDestroy {
  points$!: Observable<Feature[]>;
  points: Feature[] = [];
  selectedPoint?: Feature;
  mapProps: YMapProps = {
    location: {
      center: MapConsts.INITIAL_CENTER,
      zoom: MapConsts.INITIAL_ZOOM,
    },
    theme: MapConsts.MAP_THEME,
  };
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly yApiLoaderService: YApiLoaderService,
    private readonly cdr: ChangeDetectorRef,
    private readonly pointsService: PointsService,
    private readonly currentLocationService: CurrentLocationService
  ) {
    this.subscriptions.add(
      this.yApiLoaderService.load().subscribe((v) => {
        v.geolocation.getPosition().then((result) => {
          const newCoords: LngLat = [result.coords[0], result.coords[1]];
          this.currentLocationService.setPosition(newCoords);
          this.mapProps = {
            ...this.mapProps,
            location: {
              ...this.mapProps.location,
              center: newCoords,
            },
          };
          this.cdr.detectChanges();
        });
      })
    );
    this.points$ = toObservable(this.pointsService.points);
    this.points$.subscribe((data) => {
      this.points = data;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onMarkerClick(context: Feature) {
    this.selectedPoint = { ...context };
    this.cdr.detectChanges();
  }
}
