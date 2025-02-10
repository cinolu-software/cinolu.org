import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    title: 'Posts',
    loadComponent: () => import('./feature/list/posts.component').then((c) => c.PostsComponent)
  },
  {
    path: ':id',
    title: 'Post - Detail',
    loadComponent: () => import('./feature/details/post.component').then((c) => c.PostComponent)
  }
];
