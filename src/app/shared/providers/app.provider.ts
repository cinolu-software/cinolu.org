import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideEnvironmentInitializer,
  Provider
} from '@angular/core';
import { LoadingService } from 'app/shared/services/loading';
import { AuthService } from '../../auth/data-access/auth.service';
import { APP_CONFIG } from '../services/config/config.constants';
import { appConfig } from '../../app.config';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export const provideApp = (): EnvironmentProviders[] => {
  const providers: Provider | EnvironmentProviders = [
    { provide: APP_CONFIG, useValue: appConfig || {} },
    provideEnvironmentInitializer(() => inject(LoadingService)),
    importProvidersFrom(ToastModule),
    MessageService,
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.getProfile();
    })
  ];
  return providers;
};
