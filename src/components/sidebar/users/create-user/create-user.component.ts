import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastComponent } from '../../../toast/toast.component';
import { CommonModule } from '@angular/common';
import {
  ToastService,
  UserListService,
  UserService,
} from '../../../../libs/services';
import { SpinnerColorsEnum } from '../../../../libs/enums';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { mustMatch } from '../../../../libs/utils';
import { CreateUserDto } from '../../../../libs/dto';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    ToastComponent,
    CommonModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  form: FormGroup;
  isSubmitting = false;
  spinnerColor = SpinnerColorsEnum.SUCCESS;

  constructor(
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly userListService: UserListService
  ) {
    this.form = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        surname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(''),
      },
      { validators: mustMatch('password', 'confirmPassword') }
    );
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const createUserData: CreateUserDto = {
        name: this.form.value.name,
        surname: this.form.value.surname,
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.userService.createUser(createUserData).subscribe({
        next: () => {
          this.userListService.refetch();
          this.toastService.showToast('Успех', 'Пользователь создан');
        },
        error: (error) => {
          console.error(error);
          this.toastService.showToast(
            'Ошибка',
            'Произошла ошибка при создании'
          );
        },
        complete: () => {
          this.isSubmitting = false;
          this.form.reset();
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
