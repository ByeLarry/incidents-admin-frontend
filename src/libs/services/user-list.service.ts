import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserDto, UsersPaginationDto } from '../dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { USERS_PAGINATION_LIMIT } from '../helpers';
import { UserSortEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class UserListService {
  users = signal<UserDto[] | null>([]);
  paginationData = signal<UsersPaginationDto | null>(null);

  constructor(private readonly http: HttpClient) {
    this.refetchPaginatedUsers();
  }

  setUsers(data: UserDto[]) {
    this.users.set({ ...data });
  }

  getUsersAsObservable(): Observable<UserDto[] | null> {
    return toObservable(this.users);
  }

  getPaginationDataAsObservable(): Observable<UsersPaginationDto | null> {
    return toObservable(this.paginationData);
  }

  usersIsNull = computed(() => this.users() === null);

  private getAllUsersWithPagination(page: number, limit: number, sort: string) {
    return this.http.get<UsersPaginationDto>(
      `/api/auth/admin/users/pagination?page=${page}&limit=${limit}&sort=${sort}`,
      {
        withCredentials: true,
      }
    );
  }

  refetchPaginatedUsers(
    page = 1,
    limit = USERS_PAGINATION_LIMIT,
    sort = UserSortEnum.CREATED_AT_ASC
  ) {
    this.getAllUsersWithPagination(page, limit, sort).subscribe((data) => {
      this.users.set(data.users);
      this.paginationData.set(data);
    });
  }

  search(query: string) {
    return this.http.get<UserDto[]>(`/api/auth/admin/search?query=${query}`, {
      withCredentials: true,
    });
  }
}
