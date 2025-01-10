import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { eventsRoutes } from './events/events.routes';
import { landingRoutes } from './landing/landing.routes';
import { profileRoutes } from './profile/profile.routes';
import { ventureRoutes } from './ventures/ventures.routes';
import { aboutRoutes } from './about-us/about-us.routes';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { authGuard } from './shared/guards/auth.guard';
import { projectsRoutes } from './projects/projects.routes';

export const appRoutes: Route[] = [
  { path: 'projects', loadChildren: () => projectsRoutes },
  { path: 'events', loadChildren: () => eventsRoutes },
  { path: 'ventures', loadChildren: () => ventureRoutes },
  { path: 'about-us', loadChildren: () => aboutRoutes },
  { path: 'me', canActivate: [authGuard], loadChildren: () => profileRoutes },
  { path: '', loadChildren: () => landingRoutes },
  { path: '', canActivate: [noAuthGuard], loadChildren: () => auhtRoutes },
  { path: '**', loadChildren: () => landingRoutes }
];
