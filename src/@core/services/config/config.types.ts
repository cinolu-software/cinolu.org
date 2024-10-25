export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = Record<string, string>;
export type Theme = 'theme-default' | string;

export interface AppConfig {
  layout: string;
  scheme: Scheme;
  screens: Screens;
  theme: Theme;
}
