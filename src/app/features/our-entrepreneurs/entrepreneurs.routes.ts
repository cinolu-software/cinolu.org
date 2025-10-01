export const entrepreneursRoutes = [
  {
    path: '',
    title: 'Entrepreneurs',
    loadComponent: () =>
      import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs),
  },
  {
    path: ':id',
    title: 'Entrepreneur - Details',
    loadComponent: () =>
      import('./components/company-detail-card/company-detail-card').then(
        (c) => c.CompanyDetailCard,
      ),
  },
];
