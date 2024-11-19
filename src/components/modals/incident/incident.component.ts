import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastComponent } from '../../toast/toast.component';
import { CommonModule } from '@angular/common';
import {
  CurrentLocationService,
  PointsService,
  ToastService,
  UserService,
} from '../../../libs/services';
import { SpinnerColorsEnum } from '../../../libs/enums';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import { MarkRecvDto } from '../../../libs/dto';
import { FormatDistancePipe } from '../../../libs/pipes';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteIncidentCollapseComponent } from '../../collapses/delete-incident/delete-incident.componen';

@Component({
  selector: 'app-incident-modal',
  standalone: true,
  imports: [
    SpinnerComponent,
    CommonModule,
    ToastComponent,
    FormatDistancePipe,
    NgbTooltipModule,
    DeleteIncidentCollapseComponent,
  ],
  templateUrl: './incident.component.html',
})
export class IncidentModalComponent implements AfterViewInit, OnChanges {
  @Input() incidentFeature?: Feature;
  @ViewChild('toast') toastComponent!: ToastComponent;
  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;
  spinnerColor = SpinnerColorsEnum.DANGER;
  selectedIncident?: MarkRecvDto;
  deleteCollapseOpened = false;
  constructor(
    private readonly toastService: ToastService,
    private readonly pointsService: PointsService,
    private readonly userService: UserService,
    private readonly currentLocationService: CurrentLocationService,
    private readonly cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incidentFeature'].firstChange) return;
    this.pointsService
      .getPointInfo({
        markId: changes['incidentFeature'].currentValue.id,
        userId: this.userService.user()?.id ?? '',
        lng: this.currentLocationService.position()?.[1] ?? 0,
        lat: this.currentLocationService.position()?.[0] ?? 0,
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

  toggleDeleteCollapse() {
    this.deleteCollapseOpened = !this.deleteCollapseOpened;
  }

  handleIsClosed($event: boolean) {
    this.deleteCollapseOpened = !$event;
  }

  handleWasDeleted($event: boolean) {
    if ($event) {
      this.pointsService.refetch();
      this.toastService.showToast('Успех', 'Инцидент удален');
      this.closeButton.nativeElement.click();
    } else {
      this.toastService.showToast(
        'Произошла ошибка',
        'Не удалось удалить инцидент'
      );
    }
  }
}
