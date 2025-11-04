import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'programs/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'events/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'blog-ressources/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'our-programs/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'our-programs/:slug/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/venture/:slug/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/:id/venture/:slug/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/:id/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'entrepreneurs/venture/:slug',
    renderMode: RenderMode.Client
  },

  {
    path: 'entrepreneurs/:id/venture/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
