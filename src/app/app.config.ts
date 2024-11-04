import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { provideApp } from '@core';
import { appRoutes } from 'app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PageTitleStrategy } from '../@core/strategies/page-title.strategy';
import { httpInterceptor } from '../@core/interceptors/http.interceptor';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { provideIcons } from '@core/services/icons/icons.provider';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { authReducers } from '@core/store/auth/auth.reducers';
import { AuthEffects } from '../@core/store/auth/auth.effects';
import { provideQueryClientOptions } from '@ngneat/query';

registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideClientHydration(),
    provideIcons(),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    { provide: LOCALE_ID, useValue: 'fr' },
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    provideRouter(appRoutes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideEffects(AuthEffects),
    provideStore({
      auth: authReducers
    }),
    provideApp({
      app: {
        layout: 'empty',
        scheme: 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px'
        },
        theme: 'theme-default'
      }
    }),
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: 3000
        }
      }
    })
  ]
};
