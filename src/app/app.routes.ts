import { Routes } from '@angular/router';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { TitleResolver } from '../libs/resolvers';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    resolve: { title: TitleResolver },
  },
  {
    path: 'panel',
    loadComponent: () =>
      import('../pages/panel/panel.component').then((m) => m.PanelComponent),
    resolve: { title: TitleResolver },
  },
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: '**', redirectTo: 'panel' },
];
