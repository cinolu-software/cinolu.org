import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'programs/:id', renderMode: RenderMode.Client },
  { path: 'events/:id', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender }
];
