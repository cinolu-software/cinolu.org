import { Route } from '@angular/router';
import { auhtRoutes } from './pages/auth/auth.routes';
import { landingRoutes } from './pages/landing/landing.routes';
import { programsRoutes } from './pages/programs/programs.routes';
import { eventsRoutes } from './pages/events/events.routes';

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
