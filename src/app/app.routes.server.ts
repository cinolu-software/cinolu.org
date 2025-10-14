import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'programs/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'events/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'blog-ressources/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'our-programs/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'our-programs/:slug/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/ventures/update/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/users/edit/:email',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/projects/edit/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/events/edit/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/blog/articles/edit/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/ventures/view/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'entrepreneurs/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'entrepreneurs/:id/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'entrepreneurs/:email',
    renderMode: RenderMode.Client,
  },
  {
    path: 'entrepreneurs/venture/:email',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/products/update/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'entrepreneurs/:id/venture/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
