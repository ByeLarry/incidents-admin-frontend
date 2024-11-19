import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  DomEvent,
  DomEventHandlerObject,
  LngLat,
  YMapProps,
} from '@yandex/ymaps3-types';
import {
  YApiLoaderService,
  YMapClustererDirective,
  YMapComponent,
  YMapDefaultFeaturesLayerDirective,
  YMapDefaultSchemeLayerDirective,
  YMapListenerDirective,
} from 'angular-yandex-maps-v3';
import { Subscription } from 'rxjs';
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
import { FilterMarksComponent } from '../../../modals/filter-marks/filter-marks.component';
import { MarkSearchDto } from '../../../../libs/dto';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    YMapComponent,
    YMapDefaultSchemeLayerDirective,
    YMapDefaultFeaturesLayerDirective,
    YMapClustererDirective,
    YMapListenerDirective,
    CommonModule,
    IncidentModalComponent,
    ControlsComponent,
    FilterMarksComponent,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnDestroy {
  selectedPoints: Feature[] = [];
  selectedPoint?: Feature;
  @ViewChild('incidentsModalButton') incidentsModalButton?: ElementRef<HTMLButtonElement>;
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
          this.currentLocationService.setPosition([...newCoords]);
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
    toObservable(this.pointsService.points).subscribe((data) => {
      this.selectedPoints = [...data];
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onMarkerClick(context: Feature) {
    this.selectedPoint = { ...context };
    this.cdr.detectChanges();
  }

  onMapClick(object: DomEventHandlerObject, event: DomEvent) {
    console.log('click', object, event);
  }

  onSearchedMarkSelect(mark: MarkSearchDto) {
    const newMapCenter: LngLat = [mark.lng, mark.lat];
    this.mapProps = {
      ...this.mapProps,
      location: {
        ...this.mapProps.location,
        center: newMapCenter,
      },
    };
    this.selectedPoint = {
      id: mark.id.toString(),
      type: 'Feature',
      geometry: { coordinates: [mark.lng, mark.lat], type: 'Point' },
      properties: {
        color: mark.category.color,
        categoryId: mark.category.id,
      },
    };
    this.incidentsModalButton?.nativeElement.click();
    this.cdr.detectChanges();
  }
}
