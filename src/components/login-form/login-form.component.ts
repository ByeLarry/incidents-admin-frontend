import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, ToastService, UserService } from '../../libs/services';
import { LoginDto } from '../../libs/dto';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToastComponent } from '../toast/toast.component';
import { ACCESS_TOKEN_KEY } from '../../libs/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
    ToastComponent,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }


  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const loginData: LoginDto = {
        name: this.form.value.name,
        password: this.form.value.password,
      };
      this.authService
        .login(loginData)
        .subscribe({
          next: (data) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            this.userService.setUser(data.user);
            this.router.navigate(['/panel']);
          },
          error: (error) => {
            console.error(error);
            this.toastService.showToast(
              'Ошибка входа',
              'Неправильно введен логин или пароль'
            );
          },
        })
        .add(() => {
          this.isSubmitting = false;
          console.log('loggin')
          this.form.reset();
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
