import { SpinnerColorsEnum } from '../../libs/enums';
import { ToastComponent } from '../toast/toast.component';

export interface IPaginationComponent {
  limit: number;
  total: number;
  ariaLabel: string;
  activePage: number;
  pending: boolean;
  toastComponent: ToastComponent;
  spinnerColor: SpinnerColorsEnum;

  goToPreviousPage(): void;

  goToNextPage(): void;

  handlePageClick(pageNumber: number): void;
}
