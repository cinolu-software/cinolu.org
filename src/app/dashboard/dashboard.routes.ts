import { Routes } from '@angular/router';
import { enterprisesRoutes } from './features/enterprises/enterprises.routes';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./features/account/account.component').then((c) => c.AccountComponent)
  },
  {
    path: 'enterprises',
    title: 'Mes entreprises',
    loadChildren: () => enterprisesRoutes
  },
  {
    path: 'users',
    title: 'Les utilisateurs',
    loadComponent: () => import('./features/users/users.component').then((c) => c.DashboardUsersComponent)
  },
  {
    path: 'programs',
    title: 'Les programmes',
    loadComponent: () => import('./features/programs/programs.component').then((c) => c.DashboardProgramsComponent)
  },
  {
    path: 'projects',
    title: 'Les projets',
    loadComponent: () => import('./features/projects/projects.component').then((c) => c.DashboardProjectsComponent)
  },
  {
    path: 'events',
    title: 'Les événements',
    loadComponent: () => import('./features/events/events.component').then((c) => c.DashboardEventsComponent)
  }
];
