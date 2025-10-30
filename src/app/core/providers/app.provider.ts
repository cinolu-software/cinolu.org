import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  provideEnvironmentInitializer,
  Provider,
} from '@angular/core';
import { APP_CONFIG } from '../services/config/config.constants';
import { appConfig } from '../../app.config';
import { LoadingService } from '../services/loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { IUser } from '../../common/models/entities.models';
import { AuthStore } from '../auth/auth.store';

export const provideApp = (): EnvironmentProviders[] => {
  const providers: Provider | EnvironmentProviders = [
    { provide: APP_CONFIG, useValue: appConfig || {} },
    provideEnvironmentInitializer(() => inject(LoadingService)),
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);
      const http = inject(HttpClient);
      return http.get<{ data: IUser }>('auth/profile').pipe(
        map(({ data }) => {
          authStore.setUser(data);
        }),
        catchError(() => {
          authStore.setUser(null);
          return of(null);
        }),
      );
    }),
  ];
  return providers;
};
