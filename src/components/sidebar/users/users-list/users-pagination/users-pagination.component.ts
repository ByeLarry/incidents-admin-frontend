import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastComponent } from '../../../../toast/toast.component';
import { ToastService, UserListService } from '../../../../../libs/services';
import { UsersViaPaginationDto } from '../../../../../libs/dto';
import { Observable } from 'rxjs';
import { USERS_PAGINATION_LIMIT } from '../../../../../libs/helpers';

@Component({
  selector: 'app-users-pagination',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './users-pagination.component.html',
})
export class UsersPaginationComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  paginationData$: Observable<UsersViaPaginationDto | null>;
  activePage = 1;
  limit = USERS_PAGINATION_LIMIT;
  total = 0;

  constructor(
    private readonly userListService: UserListService,
    private readonly toastService: ToastService
  ) {
    this.paginationData$ = this.userListService.getPaginationDataAsObservable();
    this.paginationData$.subscribe((data) => {
      if (data) {
        this.activePage = data.page;
        this.limit = data.limit;
        this.total = data.total;
      }
    });
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  goToPreviousPage() {
    this.userListService.refetch(this.activePage - 1);
  }

  goToNextPage() {
    this.userListService.refetch(this.activePage + 1);
  }

  handlePageClick(pageNumber: number) {
    this.userListService.refetch(pageNumber);
  }
}
