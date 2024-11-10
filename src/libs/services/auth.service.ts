import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccessTokenDto,
  LoginDto,
  UserAndAccessTokenDto,
  UserDto,
  UserIdDto,
} from '../dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(data: LoginDto) {
    return this.http.post<UserAndAccessTokenDto>(
      '/api/auth/admin/login',
      data,
      {
        withCredentials: true,
      }
    );
  }

  refreshToken() {
    return this.http.post<AccessTokenDto>(
      '/api/auth/refresh',
      {},
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    return this.http.post('/api/auth/logout', {}, { withCredentials: true });
  }

  getUser() {
    return this.http.get<UserDto>('/api/auth/me', {
      withCredentials: true,
    });
  }

  blockUser(data: UserIdDto) {
    return this.http.patch<UserDto>('/api/auth/admin/block', data, {
      withCredentials: true,
    });
  }

  unblockUser(data: UserIdDto) {
    return this.http.patch<UserDto>('/api/auth/admin/unblock', data, {
      withCredentials: true,
    });
  }
}
