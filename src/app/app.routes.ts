import { Routes } from '@angular/router';
import { LoginPageComponent } from '../pages/login-page/login-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: 'Login' },
  {
    path: 'panel',
    loadComponent: () =>
      import('../pages/panel/panel.component').then((m) => m.PanelComponent),
    title: 'Panel',
  },
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: '**', redirectTo: 'panel' },
];
