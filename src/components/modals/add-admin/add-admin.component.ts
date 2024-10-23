import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastComponent } from '../../toast/toast.component';
import { SpinnerColorsEnum } from '../../../libs/enums';
import {
  ToastService,
  UserListService,
  UserService,
} from '../../../libs/services';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddAdminDto, UserDto } from '../../../libs/dto';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-add-admin-modal',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    ToastComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-admin.component.html',
})
export class CreateAdminModalComponent implements AfterViewInit, OnChanges {
  @Input() user?: UserDto;
  @ViewChild('toast') toastComponent!: ToastComponent;
  submitting = false;
  spinnerColor = SpinnerColorsEnum.DANGER;
  form: FormGroup;

  constructor(
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly userListService: UserListService
  ) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitting = true;

      const createAdminData: AddAdminDto = {
        id: this.form.value.id.trim(),
      };

      this.userService.addAdmin(createAdminData).subscribe({
        next: () => {
          this.userListService.refetch();
          this.toastService.showToast('Успех', 'Админ добавлен');
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case HttpStatusCode.Conflict:
              this.toastService.showToast(
                'Ошибка',
                'Администратор с таким идентификатором уже существует'
              );
              break;
            case HttpStatusCode.NotFound:
              this.toastService.showToast(
                'Ошибка',
                'Пользователь с таким идентификатором не существует'
              );
              break;
            default:
              this.toastService.showToast(
                'Ошибка',
                'Произошла ошибка при добавлении администратора'
              );
          }
        },
        complete: () => {
          this.submitting = false;
          this.form.reset();
        },
      });
    }
  }
}
