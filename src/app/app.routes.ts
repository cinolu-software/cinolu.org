import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { auhtRoutes } from './modules/auth/auth.routes';
import { landingRoutes } from './modules/landing/landing.routes';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Home',
    component: LayoutComponent,
    data: { layout: 'empty' },
    children: landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'auth' },
    children: auhtRoutes
  },
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    data: { layout: 'futuristic' },
    resolve: { initialData: initialDataResolver },
    children: dashboardRoutes
  }
];
