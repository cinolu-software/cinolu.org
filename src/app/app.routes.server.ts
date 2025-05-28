import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // { path: 'posts', renderMode: RenderMode.Client },
  { path: 'programs', renderMode: RenderMode.Client },
  { path: 'events', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
