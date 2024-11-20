import { Route } from '@angular/router';
import { auhtRoutes } from './pages/auth/auth.routes';
import { landingRoutes } from './pages/landing/landing.routes';
import { programsRoutes } from './pages/programs/programs.routes';
import { eventsRoutes } from './pages/events/events.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    children: landingRoutes
  },
  {
    path: '',
    children: auhtRoutes
  },
  {
    path: 'programs',
    children: programsRoutes
  },
  {
    path: 'events',
    children: eventsRoutes
  },
  {
    path: '**',
    children: landingRoutes
  }
];
