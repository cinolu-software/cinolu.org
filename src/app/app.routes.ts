import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { auhtRoutes } from './modules/auth/auth.routes';
import { landingRoutes } from './modules/landing/landing.routes';
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
    children: auhtRoutes
  },
  {
    path: '**',
    component: LayoutComponent,
    children: maintenanceRoutes
  }
];
