import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: 'articles',
    children: [
      {
        path: '',
        title: 'Liste des articles',
        loadComponent: () =>
          import('./pages/list-articles/list-articles').then(
            (c) => c.ListArticles,
          ),
      },
      {
        path: 'add',
        title: 'Inserer un article',
        loadComponent: () =>
          import('./pages/add-article/add-article').then((c) => c.AddArticle),
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
