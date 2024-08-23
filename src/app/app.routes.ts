import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { auhtRoutes } from './modules/auth/auth.routes';
import { landingRoutes } from './modules/landing/landing.routes';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';
import { signOutRoutes } from './modules/auth/sign-out/sign-out.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty' },
    children: landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty' },
    children: signOutRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'auth' },
    children: auhtRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'classic' },
    resolve: { initialData: initialDataResolver },
    children: dashboardRoutes
  }
];
