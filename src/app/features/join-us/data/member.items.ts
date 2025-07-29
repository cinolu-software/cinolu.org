import { DollarSign, GraduationCap, Heart, LucideIconData, UserCheck, UserCog } from 'lucide-angular';

interface IMemberItem {
  title: string;
  description: string;
  icon: LucideIconData;
  path?: string;
}

interface IGender {
  name: string;
  value: string;
}
export const MEMBER_ITEMS: IMemberItem[] = [
  {
    title: 'Je suis Entrepreneur',
    description: 'Rejoignez un réseau dynamique d’entrepreneurs et d’innovateurs.',
    icon: UserCog,
    path: '/sign-up/entrepreneur'
  },
  {
    title: 'Je suis Étudiant',
    description: 'Participez à des programmes de formation et d’accompagnement.',
    icon: GraduationCap,
    path: '/sign-up/student'
  },
  {
    title: 'Je suis Mentor / Coach',
    description: 'Contribuez à l’accompagnement des entrepreneurs et étudiants.',
    icon: UserCheck,
    path: '/sign-up/mentor'
  },
  {
    title: 'Je suis volontaire/Stagiaire',
    description: 'Engagez-vous dans des projets innovants et enrichissants.',
    icon: Heart,
    path: '/sign-up/intern'
  },
  {
    title: 'Je suis Investisseur / Partenaire',
    description: 'Investissez dans l’avenir des startups et de l’innovation.',
    icon: DollarSign,
    path: '/sign-up/investor'
  }
];

export const GENDERS: IGender[] = [
  {
    name: 'Femme',
    value: 'M'
  },
  {
    name: 'Homme',
    value: 'H'
  },
  {
    name: 'Autre',
    value: 'A'
  },
  {
    name: 'Non renseigné',
    value: 'N'
  }
];
