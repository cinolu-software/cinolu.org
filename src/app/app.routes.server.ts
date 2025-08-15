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
    path: 'dashboard/ventures/list/update/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/users/list/edit/:email',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/projects/list/edit/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/events/list/edit/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/blog/articles/edit/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/ventures/list/view/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
