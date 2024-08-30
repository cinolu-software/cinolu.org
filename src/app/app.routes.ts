import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { auhtRoutes } from './modules/auth/auth.routes';
import { landingRoutes } from './modules/landing/landing.routes';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';
import { authGuard } from './core/auth/guards/auth.guard';
import { maintenanceRoutes } from './modules/maintenance/maintenance.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'auth' },
    children: auhtRoutes
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    data: { layout: 'classic' },
    component: LayoutComponent,
    children: dashboardRoutes
  },
  {
    path: '**',
    component: LayoutComponent,
    children: maintenanceRoutes
  }
];
