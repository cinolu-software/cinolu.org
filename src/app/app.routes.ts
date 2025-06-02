import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { eventsRoutes } from './events/events.routes';
import { landingRoutes } from './landing/landing.routes';
import { aboutRoutes } from './about-us/about-us.routes';
import { projectsRoutes } from './projects/projects.routes';
// import { blogRoutes } from './blog/blog.routes';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { profileRoutes } from './profile/profile.routes';

export const routes: Route[] = [
  {
    path: 'programs',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => projectsRoutes,
  },
  {
    path: 'events',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => eventsRoutes,
  },
  {
    path: 'about-us',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => aboutRoutes,
  },
  {
    path: 'profile',
    component: LayoutComponent,
    data: { layout: 'profile-layout' },
    canActivate: [authGuard],
    loadChildren: () => profileRoutes,
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => landingRoutes,
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty-layout' },
    loadChildren: () => auhtRoutes,
  },
  {
    path: '**',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => landingRoutes,
  },
];
