import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastComponent } from '../../toast/toast.component';
import { UpdateCurrentUserDto, UserDto } from '../../../libs/dto';
import { SpinnerColorsEnum } from '../../../libs/enums';
import { ToastService, UserService } from '../../../libs/services';
import {
  ACCESS_TOKEN_KEY,
  RUS_PHONE_NUMBER_REGULAR,
} from '../../../libs/helpers';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-current-user',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './update-current-user.component.html',
})
export class UpdateCurrentUserComponent implements AfterViewInit, OnChanges {
  @Input() user?: UserDto;
  @ViewChild('toast') toastComponent!: ToastComponent;
  form: FormGroup;
  spinnerColor = SpinnerColorsEnum.PRIMARY;
  isSubmitting = false;
  isButtonDisabled = true;

  constructor(
    private readonly toastService: ToastService,
    private readonly userService: UserService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      surname: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern(RUS_PHONE_NUMBER_REGULAR),
      ]),
    });
  }

  ngOnChanges(): void {
    this.form.patchValue({
      name: this.user?.name,
      surname: this.user?.surname,
      email: this.user?.email,
      phone_number: this.user?.phone_number,
    });
    this.form.valueChanges.subscribe((values) => {
      this.isButtonDisabled =
        values.name === this.user?.name &&
        values.surname === this.user?.surname &&
        values.email === this.user?.email &&
        values.phone_number === this.user?.phone_number;
    });
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const updateData: UpdateCurrentUserDto = {
        id: this.user?.id.trim() ?? '',
        name: this.form.value.name.trim(),
        surname: this.form.value.surname.trim(),
        email: this.form.value.email.trim(),
        phone_number: this.form.value.phone_number.trim(),
      };
      this.userService
        .updateUser(updateData)
        .subscribe({
          next: (data) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            this.userService.setUser({ ...data.user });
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.toastService.showToast(
              'Ошибка',
              'Произошла ошибка при обновлении данных'
            );
          },
        })
        .add(() => {
          this.isSubmitting = false;
        });
    }
  }
}
