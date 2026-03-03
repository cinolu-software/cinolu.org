import {
  ApplicationConfig,
  LOCALE_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, TitleStrategy, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { PageTitleStrategy } from './core/strategies/page-title.strategy';
import { primeNGPreset } from './shared/config/primeng.config';
import { provideApp } from './core/providers/app.provider';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { LoadingInterceptor } from './core/services/loading';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { provideServiceWorker } from '@angular/service-worker';
import { registerLocaleData } from '@angular/common';

export function provideLocaleInitializer() {
  return () =>
    import('@angular/common/locales/fr').then((m) => {
      registerLocaleData(m.default, 'fr');
    });
}

export class CustomTranslateLoader implements TranslateLoader {
  private static readonly CACHE_BUSTER = Date.now().toString();

  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json?v=${CustomTranslateLoader.CACHE_BUSTER}`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(provideLocaleInitializer()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    provideApp(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor, LoadingInterceptor])),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'fr',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
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
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
