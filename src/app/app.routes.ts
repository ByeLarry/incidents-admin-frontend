import { Routes } from '@angular/router';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { TitleResolver } from '../libs/resolvers';
import { authGuard } from '../libs/guards';
import { LoaderComponent } from '../components/loader/loader.component';

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
    canActivate: [authGuard()],
    data: { fallback: LoaderComponent },
  },

  {
    path: 'map',
    loadComponent: () =>
      import('../pages/map/map-page.component').then((m) => m.MapPageComponent),
    resolve: { title: TitleResolver },
    canActivate: [authGuard()],
    data: { fallback: LoaderComponent },
  },
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
