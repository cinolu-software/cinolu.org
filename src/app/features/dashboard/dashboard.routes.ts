import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () => import('./shared/dashboard/pages/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'community',
    loadChildren: () => import('./user/outreach/outreach.routes').then((c) => c.outreachRoutes),
  },
  {
    path: 'account',
    loadChildren: () => import('./shared/account/account.routes').then((c) => c.accountRoutes),
  },
  {
    path: 'ventures',
    loadChildren: () => import('./user/ventures/ventures.routes').then((c) => c.venturesRoutes),
  },
  {
    path: 'products',
    loadChildren: () => import('./user/products/products.routes').then((c) => c.productsRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./staff/users/users.routes').then((c) => c.usersRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./staff/programs/programs.routes').then((c) => c.programsRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./staff/projects/projects.routes').then((c) => c.projectsRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./staff/events/events.routes').then((c) => c.eventsRoutes),
  },
  {
    path: 'blog',
    loadChildren: () => import('./staff/blog/blog.routes').then((c) => c.blogRoutes),
  },
];
