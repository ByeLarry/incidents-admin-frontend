import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastComponent } from '../../../../toast/toast.component';
import { ToastService, UserListService } from '../../../../../libs/services';
import { UsersViaPaginationDto } from '../../../../../libs/dto';
import { Observable } from 'rxjs';
import { USERS_PAGINATION_LIMIT } from '../../../../../libs/helpers';
import { SpinnerComponent } from '../../../../spinner/spinner.component';
import { SpinnerColorsEnum } from '../../../../../libs/enums';

@Component({
  selector: 'app-users-pagination',
  standalone: true,
  imports: [CommonModule, ToastComponent, SpinnerComponent],
  templateUrl: './users-pagination.component.html',
})
export class UsersPaginationComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  paginationData$: Observable<UsersViaPaginationDto | null>;
  activePage = 1;
  pending = false;
  spinnerColor = SpinnerColorsEnum.PRIMARY;
  limit = USERS_PAGINATION_LIMIT;
  total = 0;

  constructor(
    private readonly userListService: UserListService,
    private readonly toastService: ToastService
  ) {
    this.paginationData$ = this.userListService.getPaginationDataAsObservable();
    this.paginationData$.subscribe((data) => {
      if (data) {
        this.activePage = Number(data.page);
        this.limit = Number(data.limit);
        this.total = Number(data.total);
      }
      this.pending = false;
    });
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  goToPreviousPage() {
    this.userListService.refetch(this.activePage - 1);
    this.pending = true;
  }

  goToNextPage() {
    this.userListService.refetch(this.activePage + 1);
    this.pending = true;
  }

  handlePageClick(pageNumber: number) {
    this.userListService.refetch(pageNumber);
    this.pending = true;
  }
}
