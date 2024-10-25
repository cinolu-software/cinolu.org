import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, Provider, importProvidersFrom, inject } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AppConfig } from '@core/services/config';
import { APP_CONFIG } from '@core/services/config/config.constants';
import { ConfirmationService } from '@core/services/confirmation';
import { LoadingService, LoadingInterceptor } from '@core/services/loading';
import { MediaWatcherService } from '@core/services/media-watcher';
import { PlatformService } from '@core/services/platform';
import { SplashScreenService } from '@core/services/splash-screen';
import { UtilsService } from '@core/services/utils';

export interface ProviderConfig {
  app: AppConfig;
}

export const provideApp = (config: ProviderConfig): (Provider | EnvironmentProviders)[] => {
  const providers: (Provider | EnvironmentProviders)[] = [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true
      }
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      }
    },

    {
      provide: APP_CONFIG,
      useValue: config?.app ?? {}
    },

    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(ConfirmationService),
      multi: true
    },

    provideHttpClient(withInterceptors([LoadingInterceptor])),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(LoadingService),
      multi: true
    },

    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(MediaWatcherService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(PlatformService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(SplashScreenService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(UtilsService),
      multi: true
    }
  ];
  return providers;
};
