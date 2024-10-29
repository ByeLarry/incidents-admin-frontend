import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal, computed } from '@angular/core';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, Subscription } from 'rxjs';
import { MarkDto, MarkRecvDto } from '../dto';
import { WebSocketService } from './web-socket.service';
import { MsgEnum } from '../enums';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class PointsService implements OnDestroy {
  private _points = signal<Feature[]>([]); 
  points = computed(() => {
    const allPoints = this._points(); 
    const filteredCategories = this.categoryService.filteredCategories(); 

    return allPoints.filter((point) =>
      filteredCategories.some(
        (category) => category.id === point.properties?.['categoryId']
      )
    );
  }); 
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly socket: WebSocketService,
    private readonly categoryService: CategoryService 
  ) {
    this.refetch();
    const markAddedSubscription = this.socket
      .onEvent<Feature>(MsgEnum.NEW_MARK)
      .subscribe((newMark) =>
        this._points.update((prev) => [...prev, newMark])
      );

    this.subscriptions.push(markAddedSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private getAllPoints() {
    return this.http.get<Feature[]>('/api/marks/all', {
      withCredentials: true,
    });
  }

  setPoints(data: Feature[]) {
    this._points.set([...data]);
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

  deletePointById(id: number) {
    return this.http.delete(`/api/marks/${id}`, {
      withCredentials: true,
    });
  }
}
