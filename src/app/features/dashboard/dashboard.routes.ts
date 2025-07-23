import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/account/account.routes').then((c) => c.accountRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./pages/enterprises/enterprises.routes').then((c) => c.enterprisesRoutes)
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
    path: '',
    loadChildren: () => import('./pages/roles/roles.routes').then((c) => c.rolesRoutes)
  }
];
