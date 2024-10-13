import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDto, UpdateCategoryDto } from '../../sidebar/categories/dto';
import { CategoryService, ToastService } from '../../../libs/services';
import { ToastComponent } from '../../toast/toast.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { SpinnerColorsEnum } from '../../../libs/enums';

@Component({
  selector: 'app-update-category-modal',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryModalComponent implements OnChanges, AfterViewInit {
  @Input() category!: CategoryDto;
  @ViewChild('toast') toastComponent!: ToastComponent;
  form: FormGroup;
  spinnerColor = SpinnerColorsEnum.PRIMARY;
  isButtonDisabled = true;
  isSubmitting = false;

  constructor(
    private readonly toastService: ToastService,
    private readonly categoryService: CategoryService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      color: new FormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  ngOnChanges(): void {
    if (this.category) {
      this.form.patchValue({
        name: this.category.name,
        color: this.category.color,
      });
    }
    this.form.valueChanges.subscribe((values) => {
      this.isButtonDisabled =
        values.name === this.category.name &&
        values.color === this.category.color;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const updateData: UpdateCategoryDto = {
        id: this.category.id,
        name: this.form.value.name,
        color: this.form.value.color,
      };
      this.categoryService.update(updateData).subscribe({
        next: () => {
          this.toastService.showToast('Успех', 'Категория успешно обновлена');
        },
        error: (error) => {
          console.error(error);
          this.toastService.showToast(
            'Ошибка',
            'Ошибка при обновлении категории'
          );
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }
}
