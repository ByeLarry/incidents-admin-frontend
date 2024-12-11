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
import { CategoryService, ToastService } from '../../../../../libs/services';
import { CategoriesPaginationDto } from '../../../../../libs/dto';
import { Observable } from 'rxjs';
import { CATEGORIES_PAGINATION_LIMIT } from '../../../../../libs/helpers';
import { SpinnerComponent } from '../../../../spinner/spinner.component';
import {
  CategoriesSortEnum,
  SpinnerColorsEnum,
} from '../../../../../libs/enums';
import { IPaginationComponent } from '../../../../pagination/pagination.interface';

@Component({
  selector: 'app-categories-pagination',
  standalone: true,
  imports: [CommonModule, ToastComponent, SpinnerComponent],
  templateUrl: '../../../../pagination/pagination.component.html',
})
export class CategoriesPaginationComponent
  implements AfterViewInit, OnChanges, IPaginationComponent
{
  @ViewChild('toast') toastComponent!: ToastComponent;
  @Input() sortKey = CategoriesSortEnum.CREATED_AT_ASC;
  paginationData$: Observable<CategoriesPaginationDto | null>;
  activePage = 1;
  pending = false;
  spinnerColor = SpinnerColorsEnum.PRIMARY;
  limit = CATEGORIES_PAGINATION_LIMIT;
  total = 0;
  selectedSortKey = CategoriesSortEnum.CREATED_AT_ASC;
  ariaLabel = 'Categories pagination';

  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastService: ToastService
  ) {
    this.paginationData$ = this.categoryService.getPaginationDataAsObservable();
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
    this.categoryService.refetchPaginatedCategories(
      this.activePage,
      this.limit,
      this.sortKey
    );
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  goToPreviousPage() {
    this.categoryService.refetchPaginatedCategories(
      this.activePage - 1,
      this.limit,
      this.sortKey
    );
    this.pending = true;
  }

  goToNextPage() {
    this.categoryService.refetchPaginatedCategories(
      this.activePage + 1,
      this.limit,
      this.sortKey
    );
    this.pending = true;
  }

  handlePageClick(pageNumber: number) {
    this.categoryService.refetchPaginatedCategories(
      pageNumber,
      this.limit,
      this.sortKey
    );
    this.pending = true;
  } 
}
