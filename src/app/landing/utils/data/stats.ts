import { UserCog, Lightbulb, Handshake, Network, LucideIconData } from 'lucide-angular';

export const stats: { value: number; label: string; icon: LucideIconData }[] = [
  {
    value: 7000,
    label: 'Bénéficiaires',
    icon: UserCog,
  },
  {
    value: 150,
    label: 'Projets',
    icon: Lightbulb,
  },
  {
    value: 40,
    label: 'Partenaires',
    icon: Handshake,
  },
  {
    value: 8,
    label: 'Programmes',
    icon: Network,
  },
];
