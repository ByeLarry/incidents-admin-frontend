import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserDto } from '../dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  user = signal<UserDto | null>(null);

  setUser(user: UserDto) {
    this.user.set({ ...user });
  }

  getUserAsObservable(): Observable<UserDto | null> {
    return toObservable(this.user);
  }

  userIsNull = computed(() => this.user() === null);
}
