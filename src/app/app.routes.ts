import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { eventsRoutes } from './events/events.routes';
import { landingRoutes } from './landing/landing.routes';
import { aboutRoutes } from './about-us/about-us.routes';
import { projectsRoutes } from './projects/projects.routes';
import { LayoutComponent } from './shared/layout/layout.component';
import { blogRoutes } from './blog/blog.routes';

export const appRoutes: Route[] = [
  {
    path: 'programs',
    component: LayoutComponent,
    data: { layout: 'primary' },
    loadChildren: () => projectsRoutes
  },
  {
    path: 'events',
    component: LayoutComponent,
    data: { layout: 'primary' },
    loadChildren: () => eventsRoutes
  },
  {
    path: 'about-us',
    component: LayoutComponent,
    data: { layout: 'primary' },
    loadChildren: () => aboutRoutes
  },
  {
    path: 'blog',
    component: LayoutComponent,
    data: { layout: 'primary' },
    loadChildren: () => blogRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'primary' },
    loadChildren: () => landingRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'secondary' },
    loadChildren: () => auhtRoutes
  },
  {
    path: '**',
    component: LayoutComponent,
    data: { layout: 'primary' },
    loadChildren: () => landingRoutes
  }
];
