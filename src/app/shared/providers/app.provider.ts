import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  provideEnvironmentInitializer,
  Provider
} from '@angular/core';
import { APP_CONFIG } from '../services/config/config.constants';
import { appConfig } from '../../app.config';
import { LoadingService } from '../services/loading/loading.service';
import { AuthStore } from '../store/auth.store';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { IUser } from '../utils/types/models.type';

export const provideApp = (): EnvironmentProviders[] => {
  const providers: Provider | EnvironmentProviders = [
    { provide: APP_CONFIG, useValue: appConfig || {} },
    provideEnvironmentInitializer(() => inject(LoadingService)),
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);
      const http = inject(HttpClient);
      return http.get<{ data: IUser }>('auth/profile').pipe(
        tap(({ data }) => authStore.setUser(data)),
        catchError(() => {
          authStore.setUser(null);
          return of(null);
        })
      );
    })
  ];
  return providers;
};
