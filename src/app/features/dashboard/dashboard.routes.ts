import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () => import('./pages/dashboard/pages/dashboard').then((c) => c.Dashboard)
  },
  {
    path: 'community',
    loadChildren: () => import('./pages/outreach/outreach.routes').then((c) => c.outreachRoutes)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.routes').then((c) => c.accountRoutes)
  },
  {
    path: 'ventures',
    loadChildren: () => import('./pages/ventures/ventures.routes').then((c) => c.venturesRoutes)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.routes').then((c) => c.productsRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./pages/users/users.routes').then((c) => c.usersRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./pages/programs/programs.routes').then((c) => c.programsRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./pages/projects/projects.routes').then((c) => c.projectsRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./pages/events/events.routes').then((c) => c.eventsRoutes)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.routes').then((c) => c.blogRoutes)
  },
  {
    path: 'entrepreneurs',
    loadChildren: () => import('./pages/entrepreneurs/entrepreneurs.routes').then((c) => c.entrepreneursRoutes)
  }
];
