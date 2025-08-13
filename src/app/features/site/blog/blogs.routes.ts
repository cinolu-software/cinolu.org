import { Routes } from "@angular/router";

export const blogsRoutes: Routes = [
    {
        path: '',
        title: 'Blog',
        loadComponent: () =>
      import('./pages/blog').then(
        (c) => c.Blog,
      )
    },
];
