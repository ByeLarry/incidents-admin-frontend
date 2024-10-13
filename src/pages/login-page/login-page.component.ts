import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ACCESS_TOKEN_KEY } from '../../libs/helpers';
import { AuthService, UserService } from '../../libs/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LoginFormComponent, SidebarComponent, SpinnerComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  gettingUser = false;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.isTokenInStorage()) {
      this.gettingUser = true;
      this.authService
        .getUser()
        .subscribe({
          next: (user) => {
            this.userService.setUser(user);
            this.router.navigate(['/panel']);
          },
          error: () => {
            this.gettingUser = false;
          },
        });
    }
  }

  isTokenInStorage() {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }
}
