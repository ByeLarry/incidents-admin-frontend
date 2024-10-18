import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UpdateCurrentUserDto, UserAndAccessTokenDto, UserDto } from '../dto';
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
}
