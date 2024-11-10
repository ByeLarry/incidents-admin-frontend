import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserDto, UsersViaPaginationDto } from '../dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { USERS_PAGINATION_LIMIT } from '../helpers';

@Injectable({ providedIn: 'root' })
export class UserListService {
  users = signal<UserDto[] | null>([]);
  paginationData = signal<UsersViaPaginationDto | null>(null);

  constructor(private readonly http: HttpClient) {
    this.refetch();
  }

  setUsers(data: UserDto[]) {
    this.users.set({ ...data });
  }

  getUsersAsObservable(): Observable<UserDto[] | null> {
    return toObservable(this.users);
  }

  getPaginationDataAsObservable(): Observable<UsersViaPaginationDto | null> {
    return toObservable(this.paginationData);
  }

  usersIsNull = computed(() => this.users() === null);

  private getAllUsers(page: number, limit: number) {
    return this.http.get<UsersViaPaginationDto>(
      `/api/auth/admin/users?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
  }

  refetch(page = 1, limit = USERS_PAGINATION_LIMIT) {
    this.getAllUsers(page, limit).subscribe((data) => {
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
