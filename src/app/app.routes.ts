import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { auhtRoutes } from './pages/auth/auth.routes';
import { landingRoutes } from './pages/landing/landing.routes';
import { programsRoutes } from './pages/programs/programs.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    children: auhtRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    children: programsRoutes
  },
  {
    path: '**',
    component: LayoutComponent,
    children: landingRoutes
  }
];
