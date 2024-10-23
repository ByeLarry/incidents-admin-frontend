import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  AddAdminDto,
  CreateUserDto,
  UpdateCurrentUserDto,
  UserAndAccessTokenDto,
  UserDto,
  UsersStatsDto,
} from '../dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  user = signal<UserDto | null>(null);

  constructor(private readonly http: HttpClient) {}

  setUser(data: UserDto) {
    this.user.set({ ...data });
  }

  getUserAsObservable(): Observable<UserDto | null> {
    return toObservable(this.user);
  }

  userIsNull = computed(() => this.user() === null);

  updateUser(data: UpdateCurrentUserDto) {
    return this.http.patch<UserAndAccessTokenDto>('/api/auth/admin', data, {
      withCredentials: true,
    });
  }

  createUser(data: CreateUserDto) {
    return this.http.post<UserDto>('/api/auth/admin/create-user', data, {
      withCredentials: true,
    });
  }

  deleteUser(id: string) {
    return this.http.delete<UserDto>(`/api/auth/admin/${id}`, {
      withCredentials: true,
    });
  }

  addAdmin(data: AddAdminDto) {
    return this.http.patch<UserDto>('/api/auth/admin/add', data, {
      withCredentials: true,
    });
  }

  getStats() {
    return this.http.get<UsersStatsDto>('/api/auth/stats', {
      withCredentials: true,
    });
  }
}
