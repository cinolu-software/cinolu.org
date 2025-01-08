import { Itab } from '../types/tab.type';

export const tabs: Itab[] = [
  { name: 'Mon entreprise', key: null, icon: 'business', disabled: false },
  { name: 'Mes informations', key: 'my-informations', icon: 'person', disabled: false },
  { name: 'Sécurité', key: 'security', icon: 'lock', disabled: false },
  { name: 'Opportunités', key: 'opportunities', icon: 'lightbulb', disabled: true },
  { name: 'Mes communautés', key: 'communities', icon: 'group', disabled: true }
];
