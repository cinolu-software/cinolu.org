import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { joinUsRoutes } from './features/join-us/join-us.routes';
import { aboutRoutes } from './features/about-us/about-us.routes';
import { donationRoutes } from './features/donation/donation.routes';
import { contactUsRoutes } from './features/contact-us/contact-us.route';

export const routes: Route[] = [
  {
    path: 'programs',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/projects/projects.routes').then((m) => m.projectsRoutes)
  },
  {
    path: 'events',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/events/events.routes').then((m) => m.eventsRoutes)
  },
  {
    path: 'about-us',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/about-us/about-us.routes').then((m) => m.aboutRoutes)
  },
  {
    path: 'join-us',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => joinUsRoutes
  },
  {
    path: 'donation',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => donationRoutes
  },

  {
    path: 'contact-us',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => contactUsRoutes
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    data: { layout: 'dashboard-layout' },
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes)
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/landing/landing.routes').then((m) => m.landingRoutes)
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: '**',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/landing/landing.routes').then((m) => m.landingRoutes)
  }
];
