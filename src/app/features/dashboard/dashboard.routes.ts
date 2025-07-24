import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./account/account.routes').then((c) => c.accountRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./enterprises/enterprises.routes').then((c) => c.enterprisesRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./users/users.routes').then((c) => c.usersRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./programs/programs.routes').then((c) => c.programsRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./projects/projects.routes').then((c) => c.projectsRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./events/events.routes').then((c) => c.eventsRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./roles/roles.routes').then((c) => c.rolesRoutes)
  }
];
