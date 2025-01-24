import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'public/i18n/',
  langs: ['en', 'fr'],
  keysManager: {
    output: 'public/i18n/',
    addMissingKeys: true,
    defaultValue: ''
  }
};

export default config;
