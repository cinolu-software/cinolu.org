import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: 'list',
    title: '',
    children: [
      {
        path: '',
        title: 'Projects List',
        loadComponent: () => import('./pages/events-list/events-list.component').then((c) => c.EventsListComponent)
      },
      {
        path: 'add',
        title: 'Create Project',
        loadComponent: () => import('./pages/event-add/event-add.component').then((c) => c.AddEventComponent)
      },
      {
        path: 'edit/:slug',
        title: 'Edit Project',
        loadComponent: () => import('./pages/event-edit/event-edit.component').then((c) => c.EditEventComponent)
      }
    ]
  },
  {
    path: 'categories',
    title: 'Les catégories de projets',
    loadComponent: () =>
      import('./pages/event-categories/event-categories.component').then((c) => c.EventCategoriesComponent)
  }
];
