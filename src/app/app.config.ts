import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { PageTitleStrategy } from './core/strategies/page-title.strategy';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { providePrimeNG } from 'primeng/config';
import { primeNGPreset } from './shared/config/primeng.config';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { LoadingInterceptor } from './core/services/loading/loading.interceptor';
import { provideApp } from './core/providers/app.provider';
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideApp(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor, LoadingInterceptor])),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: TitleStrategy, useClass: PageTitleStrategy },
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
    provideClientHydration(withEventReplay())
  ]
};
