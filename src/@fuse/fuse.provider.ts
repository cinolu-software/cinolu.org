import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, Provider, importProvidersFrom, inject } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FuseConfig } from '@fuse/services/config';
import { FUSE_CONFIG } from '@fuse/services/config/config.constants';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseLoadingService, fuseLoadingInterceptor } from '@fuse/services/loading';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FusePlatformService } from '@fuse/services/platform';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { FuseUtilsService } from '@fuse/services/utils';

export interface FuseProviderConfig {
  fuse: FuseConfig;
}

export const provideFuse = (config: FuseProviderConfig): (Provider | EnvironmentProviders)[] => {
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
      provide: FUSE_CONFIG,
      useValue: config?.fuse ?? {}
    },

    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FuseConfirmationService),
      multi: true
    },

    provideHttpClient(withInterceptors([fuseLoadingInterceptor])),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FuseLoadingService),
      multi: true
    },

    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FuseMediaWatcherService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FusePlatformService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FuseSplashScreenService),
      multi: true
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(FuseUtilsService),
      multi: true
    }
  ];
  return providers;
};
