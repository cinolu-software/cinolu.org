import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  //   {
  //     path: 'list',
  //     children: [
  //       {
  //         path: '',
  //         title: 'Liste des articles',
  //         loadComponent: () =>
  //           import('./pages/article-list/').then((c) => c.EventsListComponent),
  //       },
  //       {
  //         path: 'add',
  //         title: 'Créer un événement',
  //         loadComponent: () =>
  //           import('./pages/event-add/event-add.component').then(
  //             (c) => c.AddEventComponent,
  //           ),
  //       },
  //       {
  //         path: 'edit/:slug',
  //         title: 'Modifier un événement',
  //         loadComponent: () =>
  //           import('./pages/event-edit/event-edit.component').then(
  //             (c) => c.EditEventComponent,
  //           ),
  //       },
  //     ],
  //   },
  {
    path: 'tags',
    title: 'Tags des articles',
    loadComponent: () =>
      import('./pages/article-tags/article-tags').then((c) => c.ArticleTags),
  },
];
