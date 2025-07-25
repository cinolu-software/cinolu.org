import { CircleChevronRight, LucideIconData } from 'lucide-angular';

interface IDonationItem {
  mount?: number;
  title: string;
  description: string;
  icon: string | LucideIconData;
  color?: string;
}

interface Iadventage {
  title: string;
  icon: string | LucideIconData;
}

export const DONATION_ITEMS: IDonationItem[] = [
  {
    mount: 25,
    title: 'Soutenir une session de coaching',
    description: 'Aidez-nous à offrir des sessions de coaching aux entrepreneurs.',
    icon: 'images/illustrations/1.svg',
    color: '#f59e0b'
  },
  {
    mount: 50,
    title: 'Financer une journée de formation',
    description: 'Contribuez à la formation des entrepreneurs et étudiants.',
    icon: 'images/illustrations/2.svg',
    color: '#10b981'
  },
  {
    mount: 100,
    title: 'Offrir un accompagnement à un·e entrepreneur·e',
    description: 'Aidez un entrepreneur à bénéficier d’un accompagnement personnalisé.',
    icon: 'images/illustrations/3.svg',
    color: '#3b82f6'
  },
  {
    mount: 300,
    title: 'Parrainer une mini-cohorte de 3 bénéficiaires',
    description: 'Soutenez une petite cohorte d’entrepreneurs dans leur parcours.',
    icon: 'images/illustrations/4.svg',
    color: '#8b5cf6'
  },
  {
    mount: undefined,
    title: 'Montant libre',
    description: 'Faites un don selon vos possibilités pour soutenir nos actions.',
    icon: 'images/illustrations/5.svg',
    color: '#f43f5e'
  }
];

export const OPTION_ITEMS: Iadventage[] = [
  {
    title: 'Offrir des bourses d’accès à nos programmes (bootcamps, incubation, accélération)',
    icon: CircleChevronRight
  },
  {
    title: 'Organiser des hackathons, des pitch days et des ateliers dans les écoles et universités',
    icon: CircleChevronRight
  },
  {
    title: 'Fournir des ressources éducatives, du mentorat et un accompagnement personnalisé',
    icon: CircleChevronRight
  },
  {
    title: 'Déployer notre plateforme numérique OneStop pour mieux connecter nos membres',
    icon: CircleChevronRight
  }
];
