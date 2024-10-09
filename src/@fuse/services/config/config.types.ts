export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = Record<string, string>;
export type Theme = 'theme-default' | string;

export interface FuseConfig {
  layout: string;
  scheme: Scheme;
  screens: Screens;
  theme: Theme;
}
