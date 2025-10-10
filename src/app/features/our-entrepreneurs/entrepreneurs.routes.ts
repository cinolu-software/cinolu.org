export const entrepreneursRoutes = [
  {
    path: '',
    title: 'Entrepreneurs',
    loadComponent: () => import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs),
  },
  {
    path: ':email',
    title: 'Entrepreneur - Details',
    loadComponent: () =>
      import('./components/entrepreneur-detail-card/entrepreneur-detail-card').then((c) => c.EntrepreneurDetailCard),
  },
  {
    path: 'venture/:slug',
    title: 'Venture - Details',
    loadComponent: () =>
      import('./components/venture-card-detail/venture-card-detail').then((c) => c.VentureCardDetail),
  },
];
