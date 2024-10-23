import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { CategoryService, ToastService } from '../../../libs/services';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastComponent } from '../../toast/toast.component';
import { CommonModule } from '@angular/common';
import { SpinnerColorsEnum } from '../../../libs/enums';
import { CategoryDto } from '../../sidebar/categories/dto';

@Component({
  selector: 'app-delete-category-modal',
  standalone: true,
  imports: [SpinnerComponent, ToastComponent, CommonModule],
  templateUrl: './delete-category.component.html',
})
export class DeleteCategoryModalComponent implements AfterViewInit, OnChanges {
  @ViewChild('toast') toastComponent!: ToastComponent;
  @Input() category!: CategoryDto;
  deletableCategory!: CategoryDto;
  submitting = false;
  spinnerColor = SpinnerColorsEnum.DANGER;

  constructor(
    private readonly toastService: ToastService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnChanges(): void {
    this.deletableCategory = { ...this.category };
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onDelete() {
    this.submitting = true;
    this.categoryService
      .delete({ id: this.category.id })
      .subscribe({
        error: () => {
          this.toastService.showToast(
            'Произошла ошибка',
            'Не удалось удалить категорию'
          );
        },
      })
      .add(() => {
        this.submitting = false;
      });
  }
}
