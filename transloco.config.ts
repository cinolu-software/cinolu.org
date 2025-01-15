import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/public/i18n/',
  defaultLang: 'fr',
  langs: ['fr', 'en', 'sw'],
  keysManager: {}
};

export default config;
