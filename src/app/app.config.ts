import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from 'app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PageTitleStrategy } from './shared/strategies/page-title.strategy';
import { httpInterceptor } from './shared/interceptors/http.interceptor';
import { provideStore } from '@ngrx/store';
import { authReducers } from 'app/shared/store/auth/auth.reducers';
import { LoadingInterceptor } from 'app/shared/services/loading';
import { provideApp } from 'app/shared/providers/app.provider';
import { providePrimeNG } from 'primeng/config';
import { provideIcons } from '@ng-icons/core';
import * as matIconOutline from '@ng-icons/material-icons/outline';
import { primeNGPreset } from './shared/utils/config/primeng.config';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

// Register French locale
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideApp(),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor, LoadingInterceptor])),
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideIcons({ ...matIconOutline }),
    providePrimeNG({
      theme: {
        preset: primeNGPreset,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    provideStore({
      auth: authReducers
    })
  ]
};
