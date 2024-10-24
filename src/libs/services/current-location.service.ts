import { Injectable, signal } from '@angular/core';
import { LngLat } from '@yandex/ymaps3-types';

@Injectable({
  providedIn: 'root',
})
export class CurrentLocationService {
  position = signal<LngLat | null>(null);

  getPosition() {
    return this.position();
  }

  getReversedPosition() {
    return this.position()?.reverse();
  }

  setPosition(position: LngLat) {
    this.position.set(position);
  }
}
