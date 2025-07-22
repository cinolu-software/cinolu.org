import { UserCog, Lightbulb, Handshake, Network, LucideIconData } from 'lucide-angular';

export const stats: { value: number; label: string; icon: LucideIconData }[] = [
  {
    value: 7000,
    label: 'Bénéficiaires',
    icon: UserCog
  },
  {
    value: 500,
    label: 'Entrepreneurs accompagnés',
    icon: Network
  },
  {
    value: 10000,
    label: 'Femmes formées & inspirées avec F360',
    icon: Network
  },
  {
    value: 5,
    label: 'Programmes et forums d’innovation régionale',
    icon: Lightbulb
  },
  {
    value: 40,
    label: 'Un réseau de partenaires stratégique',
    icon: Handshake
  }
];
