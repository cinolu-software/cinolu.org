import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { eventsRoutes } from './events/events.routes';
import { landingRoutes } from './landing/landing.routes';
import { aboutRoutes } from './about-us/about-us.routes';
import { projectsRoutes } from './projects/projects.routes';
import { blogRoutes } from './blog/blog.routes';

export const appRoutes: Route[] = [
  { path: 'projects', loadChildren: () => projectsRoutes },
  { path: 'events', loadChildren: () => eventsRoutes },
  { path: 'about-us', loadChildren: () => aboutRoutes },
  { path: 'blog', loadChildren: () => blogRoutes },
  { path: '', loadChildren: () => landingRoutes },
  { path: '', loadChildren: () => auhtRoutes },
  { path: '**', loadChildren: () => landingRoutes }
];
