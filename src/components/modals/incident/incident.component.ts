import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastComponent } from '../../toast/toast.component';
import { CommonModule } from '@angular/common';
import {
  PointsService,
  ToastService,
  UserService,
} from '../../../libs/services';
import { SpinnerColorsEnum } from '../../../libs/enums';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import { MarkRecvDto } from '../../../libs/dto';
import { FormatDistancePipe } from '../../../libs/pipes';

@Component({
  selector: 'app-incident-modal',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, ToastComponent, FormatDistancePipe],
  templateUrl: './incident.component.html',
})
export class IncidentModalComponent implements AfterViewInit, OnChanges {
  @Input() incidentFeature?: Feature;
  @ViewChild('toast') toastComponent!: ToastComponent;
  spinnerColor = SpinnerColorsEnum.DANGER;
  selectedIncident?: MarkRecvDto;

  constructor(
    private readonly toastService: ToastService,
    private readonly pointsService: PointsService,
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incidentFeature'].firstChange) return;
    this.pointsService
      .getPointInfo({
        markId: changes['incidentFeature'].currentValue.id,
        userId: this.userService.user()?.id ?? '',
        lng: changes['incidentFeature'].currentValue.geometry.coordinates[0],
        lat: changes['incidentFeature'].currentValue.geometry.coordinates[1],
      })
      .subscribe((data) => {
        this.selectedIncident = { ...data };
        this.cdr.detectChanges();
      });
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  async copyToClipboard(data?: string) {
    if (data) {
      await navigator.clipboard.writeText(data);
      this.toastService.showToast('Скопировано', data);
    }
  }
}
