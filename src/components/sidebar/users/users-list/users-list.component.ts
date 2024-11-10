import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastService, UserListService } from '../../../../libs/services';
import { UserDto } from '../../../../libs/dto';
import { RolesEnum } from '../../../../libs/enums';
import { ToastComponent } from '../../../toast/toast.component';
import { BlockUserModalComponent } from '../../../modals/block-user/block-user.component';
import { UnblockUserModalComponent } from '../../../modals/unblock-user/unblock-user.component';
import { DeleteUserModalComponent } from '../../../modals/delete-user/delete-user.component';
import { UsersPaginationComponent } from './users-pagination/users-pagination.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { SEARCH_DEBOUNCE_TIME } from '../../../../libs/helpers';

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
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements AfterViewInit, OnInit {
  @ViewChild('toast') toastComponent!: ToastComponent;
  form: FormGroup;
  searchResults: UserDto[] = [];
  selectedUser?: UserDto;
  searchMode = false;
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
    this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(SEARCH_DEBOUNCE_TIME),
        map(val => val.trim()),
        switchMap((value) => {
          this.searchMode = !!value;
          if (value) return this.userListService.search(value);
          else return of([]);
        })
      )
      .subscribe((data) => {
        this.searchResults = [...data];
      });
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
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
