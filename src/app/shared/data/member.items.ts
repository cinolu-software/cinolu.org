import {
  DollarSign,
  GraduationCap,
  Heart,
  LucideIconData,
  UserCheck,
  UserCog,
} from 'lucide-angular';

interface IMemberItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIconData;
}

export const MEMBER_ITEMS: IMemberItem[] = [
  {
    id: 0,
    title: 'Membre simple',
    description: 'Rejoignez un réseau dynamique.',
    icon: UserCog,
  },
  {
    id: 1,
    title: 'Je suis Entrepreneur',
    description:
      'Rejoignez un réseau dynamique d’entrepreneurs et d’innovateurs.',
    icon: UserCog,
  },
  {
    id: 2,
    title: 'Je suis Étudiant',
    description:
      'Participez à des programmes de formation et d’accompagnement.',
    icon: GraduationCap,
  },
  {
    id: 3,
    title: 'Je suis Mentor / Coach',
    description:
      'Contribuez à l’accompagnement des entrepreneurs et étudiants.',
    icon: UserCheck,
  },
  {
    id: 4,
    title: 'Je suis volontaire/Stagiaire',
    description: 'Engagez-vous dans des projets innovants et enrichissants.',
    icon: Heart,
  },
  {
    id: 5,
    title: 'Je suis Investisseur / Partenaire',
    description: 'Investissez dans l’avenir des startups et de l’innovation.',
    icon: DollarSign,
  },
];

export const GENDERS = ['Femme', 'Homme'];
