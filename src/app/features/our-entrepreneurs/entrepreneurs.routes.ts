export const entrepreneursRoutes = [
  {
    path: '',
    title: 'Entrepreneurs',
    loadComponent: () =>
      import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs),
  },
  {
    path: ':email',
    title: 'Entrepreneur - Details',
    loadComponent: () =>
      import(
        './components/entrepreneur-detail-card/entrepreneur-detail-card'
      ).then((c) => c.EntrepreneurDetailCard),
  },
];
