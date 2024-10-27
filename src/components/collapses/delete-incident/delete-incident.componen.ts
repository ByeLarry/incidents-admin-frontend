import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PointsService } from '../../../libs/services';

@Component({
  selector: 'app-delete-incident-collapse',
  standalone: true,
  imports: [],
  templateUrl: './delete-incident.component.html',
})
export class DeleteIncidentCollapseComponent {
  @Input() incidentId?: number;
  @Input() isOpened = false;
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() wasDeleted = new EventEmitter<boolean>();

  constructor(private readonly pointsService: PointsService) {}

  closeCollapse() {
    this.isClosed.emit(true);
  }

  onDelete() {
    if (!this.incidentId) return;
    this.pointsService
      .deletePointById(this.incidentId)
      .subscribe({
        next: () => {
          this.wasDeleted.emit(true);
        },
        error: () => {
          this.wasDeleted.emit(false);
        },
      })
      .add(() => {
        this.closeCollapse();
      });
  }
}
