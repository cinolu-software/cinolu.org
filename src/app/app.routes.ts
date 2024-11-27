import { Route } from '@angular/router';
import { auhtRoutes } from './features/auth/auth.routes';
import { eventsRoutes } from './features/events/events.routes';
import { landingRoutes } from './features/landing/landing.routes';
import { programsRoutes } from './features/programs/programs.routes';

export const appRoutes: Route[] = [
  { path: 'programs', loadChildren: () => programsRoutes },
  { path: 'events', loadChildren: () => eventsRoutes },
  { path: '', loadChildren: () => landingRoutes },
  { path: '', loadChildren: () => auhtRoutes },
  { path: '**', loadChildren: () => landingRoutes }
];
