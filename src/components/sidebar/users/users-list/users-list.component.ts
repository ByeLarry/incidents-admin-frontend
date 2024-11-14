import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastService, UserListService } from '../../../../libs/services';
import { UserDto } from '../../../../libs/dto';
import { RolesEnum, SpinnerColorsEnum } from '../../../../libs/enums';
import { ToastComponent } from '../../../toast/toast.component';
import { BlockUserModalComponent } from '../../../modals/block-user/block-user.component';
import { UnblockUserModalComponent } from '../../../modals/unblock-user/unblock-user.component';
import { DeleteUserModalComponent } from '../../../modals/delete-user/delete-user.component';
import { UsersPaginationComponent } from './users-pagination/users-pagination.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of, Subscription, switchMap } from 'rxjs';
import { SEARCH_DEBOUNCE_TIME } from '../../../../libs/helpers';
import { SpinnerComponent } from '../../../spinner/spinner.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    BlockUserModalComponent,
    UnblockUserModalComponent,
    DeleteUserModalComponent,
    UsersPaginationComponent,
    NgbTooltipModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('toast') toastComponent!: ToastComponent;
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;
  searchResults: UserDto[] = [];
  selectedUser?: UserDto;
  searchMode = false;
  searchPending = false;
  spinnerColor = SpinnerColorsEnum.PRIMARY;
  adminRole = RolesEnum.ADMIN;
  users$ = this.userListService.getUsersAsObservable();

  constructor(
    private readonly userListService: UserListService,
    private readonly toastService: ToastService
  ) {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }
  ngOnInit() {
    const searchSubscription = this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(SEARCH_DEBOUNCE_TIME),
        map((val) => val.trim()),
        switchMap((value) => {
          this.searchMode = !!value;
          if (value) {
            this.searchPending = true;
            return this.userListService.search(value);
          } else {
            this.searchPending = false;
            return of([]);
          }
        })
      )
      .subscribe({
        next: (data) => {
          this.searchPending = false;
          this.searchResults = [...data];
        },
        error: () => {
          this.searchPending = false;
          this.searchResults = [];
        },
      });

      const usersSubscription = this.users$.subscribe(() => {
      this.form.setValue({
        search: this.form.get('search')?.value,
      });
    });

    this.subscriptions.add(searchSubscription);
    this.subscriptions.add(usersSubscription);
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async copyToClipboard(id: string) {
    if (id) {
      await navigator.clipboard.writeText(id);
      this.toastService.showToast('Скопировано', id);
    }
  }

  onSelectUser(data: UserDto) {
    this.selectedUser = { ...data };
  }
}
