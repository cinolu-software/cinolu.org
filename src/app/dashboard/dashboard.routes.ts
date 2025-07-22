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
    loadComponent: () => import('./features/users/users.component').then((c) => c.UsersComponent)
  },
  {
    path: 'programs',
    title: 'Les programmes',
    loadComponent: () => import('./features/programs/programs.component').then((c) => c.ProgramsComponent)
  },
  {
    path: 'projects',
    title: 'Les projets',
    loadComponent: () => import('./features/projects/projects.component').then((c) => c.ProjectsComponent)
  },
  {
    path: 'project-categories',
    title: 'Les catégories de projets',
    loadComponent: () =>
      import('./features/project-categories/categories.component').then((c) => c.ProjectCategoriesComponent)
  },
  {
    path: 'events',
    title: 'Les événements',
    loadComponent: () => import('./features/events/events.component').then((c) => c.EventsComponent)
  },
  {
    path: 'event-categories',
    title: "Les catégories d'événements",
    loadComponent: () =>
      import('./features/event-categories/categories.component').then((c) => c.EventCategoriesComponent)
  },
  {
    path: 'roles',
    title: 'Les rôles',
    loadComponent: () => import('./features/roles/roles.component').then((c) => c.RolesComponent)
  }
];
