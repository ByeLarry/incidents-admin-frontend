import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { MarkDto, MarkRecvDto } from '../dto';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  points = signal<Feature[]>([]);

  constructor(private readonly http: HttpClient) {
    this.refetch();
  }

  private getAllPoints() {
    return this.http.get<Feature[]>('/api/marks/all', {
      withCredentials: true,
    });
  }

  setPoints(data: Feature[]) {
    this.points.set([...data]);
  }

  getPointsAsObservable(): Observable<Feature[]> {
    return toObservable(this.points);
  }

  refetch() {
    this.getAllPoints().subscribe((data) => {
      this.setPoints(data);
    });
  }

  getPointInfo(data: MarkDto) {
    return this.http.get<MarkRecvDto>(
      `/api/marks/one?markId=${data.markId}&userId=${data.userId}&lng=${data.lng}&lat=${data.lat}`,
      {}
    );
  }
}
