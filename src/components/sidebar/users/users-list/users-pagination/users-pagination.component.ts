import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ToastComponent } from '../../../../toast/toast.component';
import { ToastService, UserListService } from '../../../../../libs/services';
import { UsersPaginationDto } from '../../../../../libs/dto';
import { Observable } from 'rxjs';
import { USERS_PAGINATION_LIMIT } from '../../../../../libs/helpers';
import { SpinnerComponent } from '../../../../spinner/spinner.component';
import { SpinnerColorsEnum, UserSortEnum } from '../../../../../libs/enums';
import { IPaginationComponent } from '../../../../pagination/pagination.interface';

@Component({
  selector: 'app-users-pagination',
  standalone: true,
  imports: [CommonModule, ToastComponent, SpinnerComponent],
  templateUrl: '../../../../pagination/pagination.component.html',
})
export class UsersPaginationComponent
  implements AfterViewInit, OnChanges, IPaginationComponent
{
  @ViewChild('toast') toastComponent!: ToastComponent;
  @Input() sortKey = UserSortEnum.CREATED_AT_ASC;
  paginationData$: Observable<UsersPaginationDto | null>;
  activePage = 1;
  pending = false;
  spinnerColor = SpinnerColorsEnum.PRIMARY;
  limit = USERS_PAGINATION_LIMIT;
  total = 0;
  ariaLabel = 'Users pagination';

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
  ngOnChanges(changes: SimpleChanges): void {
    this.sortKey = changes['sortKey'].currentValue;
    this.userListService.refetchPaginatedUsers(this.activePage, this.limit, this.sortKey);
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  goToPreviousPage() {
    this.userListService.refetchPaginatedUsers(this.activePage - 1, this.limit, this.sortKey);
    this.pending = true;
  }

  goToNextPage() {
    this.userListService.refetchPaginatedUsers(this.activePage + 1, this.limit, this.sortKey);
    this.pending = true;
  }

  handlePageClick(pageNumber: number) {
    this.userListService.refetchPaginatedUsers(pageNumber, this.limit, this.sortKey);
    this.pending = true;
  }
}
