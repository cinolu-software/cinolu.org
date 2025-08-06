import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { contactUsRoutes } from './features/site/contact-us/contact-us.route';
import { donationRoutes } from './features/site/donation/donation.routes';

export const routes: Route[] = [
  {
    path: 'programs',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/site/projects/projects.routes').then((m) => m.projectsRoutes)
  },
  {
    path: 'events',
    component: LayoutComponent,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/site/events/events.routes').then((m) => m.eventsRoutes)
  },
  {
    path: 'about-us',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/site/about-us/about-us.routes').then((m) => m.aboutRoutes)
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
    loadChildren: () => import('./features/site/landing/landing.routes').then((m) => m.landingRoutes)
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    loadChildren: () => import('./features/site/auth/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: '**',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/site/landing/landing.routes').then((m) => m.landingRoutes)
  }
];
