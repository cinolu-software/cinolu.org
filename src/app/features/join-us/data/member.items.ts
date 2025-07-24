import { DollarSign, GraduationCap, Heart, LucideIconData, UserCheck, UserCog } from 'lucide-angular';

interface IMemberItem {
  title: string;
  description: string;
  icon: LucideIconData;
}
export const MEMBER_ITEMS: IMemberItem[] = [
  {
    title: 'Je suis Entrepreneur',
    description: 'Rejoignez un réseau dynamique d’entrepreneurs et d’innovateurs.',
    icon: UserCog
  },
  {
    title: 'Je suis Étudiant',
    description: 'Participez à des programmes de formation et d’accompagnement.',
    icon: GraduationCap
  },
  {
    title: 'Je suis Mentor / Coach / Expert',
    description: 'Contribuez à l’accompagnement des entrepreneurs et étudiants.',
    icon: UserCheck
  },
  {
    title: 'Je suis volontaire / Stagiaire',
    description: 'Engagez-vous dans des projets innovants et enrichissants.',
    icon: Heart
  },
  {
    title: 'Je suis Investisseur / Partenaire',
    description: 'Investissez dans l’avenir des startups et de l’innovation.',
    icon: DollarSign
  }
];

// Je suis Entrepreneur
// 🧑🏽‍🎓 Je suis Étudiant
// 🧑🏽‍🏫 Je suis Mentor / Coach / Expert
// 🧑🏽‍🎓Je suis volontaire / Stagiaire
// 💼 Je suis Investisseur / Partenaire
