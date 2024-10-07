import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [NgbModal],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'incidents-admin-frontend';

  constructor(private modalService: NgbModal) {}

  public open(modal: unknown): void {
    this.modalService.open(modal);
  }
}
