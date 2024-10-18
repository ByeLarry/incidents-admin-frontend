import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserDto } from '../dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AllUsersService {
  users = signal<UserDto[] | null>([]);

  constructor(private readonly http: HttpClient) {
    this.refetch();
  }

  setUsers(data: UserDto[]) {
    this.users.set({ ...data });
  }

  getUsersAsObservable(): Observable<UserDto[] | null> {
    return toObservable(this.users);
  }

  usersIsNull = computed(() => this.users() === null);

  private getAllUsers() {
    return this.http.get<UserDto[]>('/api/auth/users', {
      withCredentials: true,
    });
  }

  refetch() {
    this.getAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
}
