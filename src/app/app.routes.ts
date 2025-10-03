import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Layout } from './layout/layout';

export const routes: Route[] = [
  {
    path: 'programs',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () =>
      import('./features/projects/projects.routes').then(
        (m) => m.projectsRoutes,
      ),
  },
  {
    path: 'partners',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () =>
      import('./features/our-parteners/parteners.route').then(
        (m) => m.OurParteners,
      ),
  },
  {
    path: 'our-programs',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () =>
      import('./features/our-programs/programs.routes').then(
        (m) => m.programsRoutes,
      ),
  },
  {
    path: 'jobs-opportunities',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/jobs-opportunities/jobs.routes').then(
        (m) => m.jobsRoutes,
      ),
  },
  {
    path: 'events',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () =>
      import('./features/events/events.routes').then((m) => m.eventsRoutes),
  },
  {
    path: 'about-us',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/about-us/about-us.routes').then((m) => m.aboutRoutes),
  },
  {
    path: 'donation',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/donation/donation.routes').then(
        (m) => m.donationRoutes,
      ),
  },
  // {
  //   path: 'entrepreneurs',
  //   component: Layout,
  //   data: { layout: 'full-layout' },
  //   loadChildren: () =>
  //     import('./features/our-entrepreneurs/entrepreneurs.routes').then(
  //       (m) => m.entrepreneursRoutes,
  //     ),
  // },
  {
    path: 'entrepreneurs/:id',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () =>
      import('./features/our-entrepreneurs/entrepreneurs.routes').then(
        (m) => m.entrepreneursRoutes,
      ),
  },
  {
    path: 'gallery',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/galerry/gallery.routes').then((m) => m.galleryRoutes),
  },
  {
    path: 'contact-us',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/contact-us/contact-us.route').then(
        (m) => m.contactUsRoutes,
      ),
  },
  {
    path: 'dashboard',
    component: Layout,
    data: { layout: 'dashboard-layout' },
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.dashboardRoutes,
      ),
  },
  {
    path: 'blog-ressources',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/blog/blogs.routes').then((m) => m.blogsRoutes),
  },
  {
    path: '',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/landing/landing.routes').then((m) => m.landingRoutes),
  },
  {
    path: '',
    component: Layout,
    data: { layout: 'empty-layout' },
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '**',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () =>
      import('./features/landing/landing.routes').then((m) => m.landingRoutes),
  },
];
