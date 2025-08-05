interface IPrograms {
  name: string;
  description: string;
  link: string;
  path: string;
}

export const PROGRAMS_ITEMS: IPrograms[] = [
  {
    name: 'F360 – Femmes 360',
    description: 'pour l’autonomisation des femmes dans l’innovation et l’entrepreneuriat',
    link: 'Découvrir F360',
    path: 'https://google.com'
  },
  {
    name: 'Ushindi',
    description: 'pour la jeunesse et les professionnels en quête d’impact',
    link: 'Explorer Ushindi',
    path: 'https://google.com'
  },
  {
    name: 'Uvumbuzi',
    description: 'pour transformer la recherche scientifique en solution concrète',
    link: 'Découvrir Uvumbuzi',
    path: 'https://google.com'
  },
  {
    name: 'Cinolu Fellowship',
    description: 'pour les volontaires, stagiaires et jeunes engagés',
    link: 'Rejoindre le Fellowship',
    path: 'https://google.com'
  },
  {
    name: 'Ushaidi',
    description: 'pour favoriser l’inclusion numérique et l’expression citoyenne',
    link: 'Découvrir Ushaidi',
    path: 'https://google.com'
  }
];
