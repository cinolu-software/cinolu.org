import { Route } from '@angular/router';
import { auhtRoutes } from './modules/auth/auth.routes';
import { eventsRoutes } from './modules/events/events.routes';
import { landingRoutes } from './modules/landing/landing.routes';
import { programsRoutes } from './modules/programs/programs.routes';

export const appRoutes: Route[] = [
  { path: 'programs', loadChildren: () => programsRoutes },
  { path: 'events', loadChildren: () => eventsRoutes },
  { path: '', loadChildren: () => landingRoutes },
  { path: '', loadChildren: () => auhtRoutes },
  { path: '**', loadChildren: () => landingRoutes }
];
