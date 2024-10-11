import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, ToastService } from '../../libs/services';
import { LoginDto } from '../../libs/dto';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToastComponent } from '../toast/toast.component';

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
    private readonly toastService: ToastService
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
      this.toastService.showToast('fsdafsdafsdafsda', 'fsda  fsdafsdafsda');
      this.authService
        .login(loginData)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.error(error);
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
