import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    title: 'Blog Posts',
    loadComponent: () => import('./feature/posts/posts.component').then((c) => c.PostsComponent)
  },
  {
    path: ':slug',
    title: 'Blog Post',
    loadComponent: () => import('./feature/post/post.component').then((c) => c.PostComponent)
  }
];
