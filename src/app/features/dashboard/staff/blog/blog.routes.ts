import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: 'articles',
    children: [
      {
        path: '',
        title: 'Liste des articles',
        loadComponent: () =>
          import('./pages/article-list/article-list').then(
            (c) => c.ArticleList,
          ),
      },
      {
        path: 'add',
        title: 'Inserer un article',
        loadComponent: () =>
          import('./pages/article-add/article-add').then((c) => c.ArticleAdd),
      },
      //       {
      //         path: 'edit/:slug',
      //         title: 'Modifier un événement',
      //         loadComponent: () =>
      //           import('./pages/event-edit/event-edit.component').then(
      //             (c) => c.EditEventComponent,
      //           ),
      //       },
    ],
  },
  {
    path: 'tags',
    title: 'Tags des articles',
    loadComponent: () =>
      import('./pages/article-tags/article-tags').then((c) => c.ArticleTags),
  },
];
