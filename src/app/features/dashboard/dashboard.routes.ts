import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./account/account.routes').then((c) => c.accountRoutes)
  },
  {
    path: 'ventures',
    loadChildren: () => import('./ventures/ventures.routes').then((c) => c.venturesRoutes)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes').then((c) => c.usersRoutes)
  },
  {
    path: 'programs',
    loadChildren: () => import('./programs/programs.routes').then((c) => c.programsRoutes)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.routes').then((c) => c.projectsRoutes)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.routes').then((c) => c.eventsRoutes)
  }
];
