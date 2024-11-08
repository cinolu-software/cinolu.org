import { ILink } from './types/link.type';

export const authLinks: ILink[] = [
  {
    name: 'Se connecter',
    path: '/sign-in',
    exactUrl: true
  },
  {
    name: "S'inscrire",
    path: '/sign-up',
    exactUrl: true
  }
];

export const commonLinks: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    exactUrl: true
  },
  {
    name: 'Programmes',
    path: '/programs',
    exactUrl: false
  },
  {
    name: 'Evénements',
    path: '/events',
    exactUrl: false
  }
];
