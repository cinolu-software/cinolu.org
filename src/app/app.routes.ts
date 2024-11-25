import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { landingRoutes } from './landing/landing.routes';
import { programsRoutes } from './programs/programs.routes';
import { eventsRoutes } from './events/events.routes';

export const appRoutes: Route[] = [
  {
    path: 'programs',
    loadChildren: () => programsRoutes
  },
  {
    path: 'events',
    loadChildren: () => eventsRoutes
  },
  {
    path: '',
    loadChildren: () => landingRoutes
  },
  {
    path: '',
    loadChildren: () => auhtRoutes
  },
  {
    path: '**',
    loadChildren: () => landingRoutes
  }
];
