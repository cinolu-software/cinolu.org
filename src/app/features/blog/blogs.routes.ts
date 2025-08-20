import { Routes } from '@angular/router';

export const blogsRoutes: Routes = [
  {
    path: '',
    title: 'Blog',
    loadComponent: () => import('./pages/blog').then((c) => c.Blog),
  },
  {
    path: ':slug',
    title: 'Article - Details',
    loadComponent: () =>
      import('./pages/detail-article/detail-article').then(
        (c) => c.DetailArticle,
      ),
  },
];
