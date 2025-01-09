import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CategoryService, ToastService } from '../../../../libs/services';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastComponent } from '../../../toast/toast.component';
import { CreateCategoryDto } from '../dto';
import { SpinnerColorsEnum } from '../../../../libs/enums';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    ToastComponent,
  ],
  templateUrl: './category-create.component.html',
})
export class CategoryCreateComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  form: FormGroup;
  isSubmitting = false;
  spinnerColor = SpinnerColorsEnum.SUCCESS

  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastService: ToastService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      color: new FormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const data: CreateCategoryDto = {
        name: this.form.value.name,
        color: this.form.value.color,
      };
      console.log(data);
      this.categoryService
        .create(data)
        .subscribe({
          error: (error) => {
            console.error(error);
            this.toastService.showToast(
              'Ошибка',
              'Не удалось создать категорию'
            );
          },
        })
        .add(() => {
          this.isSubmitting = false;
          this.form.reset();
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
