import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { eventsRoutes } from './events/events.routes';
import { landingRoutes } from './landing/landing.routes';
import { programsRoutes } from './programs/programs.routes';
import { profileRoutes } from './profile/profile.routes';
import { ventureRoutes } from './ventures/ventures.routes';
import { aboutRoutes } from './about-us/about-us.routes';

export const appRoutes: Route[] = [
  { path: 'programs', loadChildren: () => programsRoutes },
  { path: 'events', loadChildren: () => eventsRoutes },
  { path: 'ventures', loadChildren: () => ventureRoutes },
  { path: 'about-us', loadChildren: () => aboutRoutes },
  { path: 'me', loadChildren: () => profileRoutes },
  { path: '', loadChildren: () => landingRoutes },
  { path: '', loadChildren: () => auhtRoutes },
  { path: '**', loadChildren: () => landingRoutes }
];
