import { EnvironmentProviders, inject, provideAppInitializer, provideEnvironmentInitializer } from '@angular/core';
import { LoadingService } from 'app/shared/services/loading';
import { AuthService } from '../../auth/data-access/auth.service';

export const provideApp = (): EnvironmentProviders[] => {
  const providers = [
    provideEnvironmentInitializer(() => inject(LoadingService)),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.getProfile();
    })
  ];
  return providers;
};
