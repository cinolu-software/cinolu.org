import { Route } from '@angular/router';
import { auhtRoutes } from './features/auth/auth.routes';
import { aboutRoutes } from './features/about-us/about-us.routes';
import { authGuard } from './core/guards/auth.guard';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { landingRoutes } from './features/landing/landing.routes';
import { LayoutComponent } from './layout/layout.component';
import { eventsRoutes } from './features/events/events.routes';
import { projectsRoutes } from './features/projects/projects.routes';

export const routes: Route[] = [
  {
    path: 'programs',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => projectsRoutes
  },
  {
    path: 'events',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => eventsRoutes
  },
  {
    path: 'about-us',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => aboutRoutes
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout' },
    canActivate: [authGuard],
    loadChildren: () => dashboardRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    loadChildren: () => auhtRoutes
  },
  {
    path: '**',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => landingRoutes
  }
];
