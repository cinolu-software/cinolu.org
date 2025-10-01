export const entrepreneursRoutes = [
  {
    path: '',
    title: 'Entrepreneurs',
    loadComponent: () =>
      import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs),
  },
];
