import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static pages - Prerender
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about-us',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact-us',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'gallery',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'faq',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'partners',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'ambassadeurs',
    renderMode: RenderMode.Prerender
  },

  // Dynamic pages - Client-side rendering
  {
    path: 'ambassadeurs/:email',
    renderMode: RenderMode.Client
  },
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

  // Dashboard routes - Client-side only (authenticated)
  {
    path: 'dashboard/**',
    renderMode: RenderMode.Client
  },

  // Auth routes - Client-side only
  {
    path: 'sign-in',
    renderMode: RenderMode.Client
  },
  {
    path: 'sign-up',
    renderMode: RenderMode.Client
  },
  {
    path: 'forgot-password',
    renderMode: RenderMode.Client
  },
  {
    path: 'reset-password',
    renderMode: RenderMode.Client
  },

  // Fallback - Prerender remaining routes
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
