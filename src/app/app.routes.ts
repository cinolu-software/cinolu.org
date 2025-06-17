import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { eventsRoutes } from './events/events.routes';
import { landingRoutes } from './landing/landing.routes';
import { aboutRoutes } from './about-us/about-us.routes';
import { projectsRoutes } from './projects/projects.routes';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { profileRoutes } from './profile/profile.routes';

export const routes: Route[] = [
  {
    path: 'programs',
    component: LayoutComponent,
    data: { layout: 'fullLayout', fixedHeader: true },
    loadChildren: () => projectsRoutes
  },
  {
    path: 'events',
    component: LayoutComponent,
    data: { layout: 'fullLayout', fixedHeader: true },
    loadChildren: () => eventsRoutes
  },
  {
    path: 'about-us',
    component: LayoutComponent,
    data: { layout: 'fullLayout' },
    loadChildren: () => aboutRoutes
  },
  {
    path: 'profile',
    component: LayoutComponent,
    data: { layout: 'profileLayout' },
    canActivate: [authGuard],
    loadChildren: () => profileRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'fullLayout' },
    loadChildren: () => landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'emptyLayout' },
    loadChildren: () => auhtRoutes
  },
  {
    path: '**',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => landingRoutes
  }
];
