import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  provideEnvironmentInitializer,
  Provider
} from '@angular/core';
import { LoadingService } from 'app/shared/services/loading';
import { AuthService } from '../../auth/data-access/auth.service';
import { APP_CONFIG } from '../services/config/config.constants';
import { appConfig } from '../../app.config';

export const provideApp = (): EnvironmentProviders[] => {
  const providers: Provider | EnvironmentProviders = [
    { provide: APP_CONFIG, useValue: appConfig ?? {} },
    provideEnvironmentInitializer(() => inject(LoadingService)),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.getProfile();
    })
  ];
  return providers;
};
