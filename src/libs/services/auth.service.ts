import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../dto';
import { UserDto } from '../dto/user.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(data: LoginDto) {
    return this.http.post<UserDto>('/api/auth/admin-login', data, {
      withCredentials: true,
    });
  }
}
