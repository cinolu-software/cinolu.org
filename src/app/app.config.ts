import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, provideExperimentalZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from 'app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PageTitleStrategy } from './shared/strategies/page-title.strategy';
import { httpInterceptor } from './shared/interceptors/http.interceptor';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { provideIcons } from 'app/shared/services/icons/icons.provider';
import { provideStore } from '@ngrx/store';
import { authReducers } from 'app/shared/store/auth/auth.reducers';
import { LoadingInterceptor } from 'app/shared/services/loading';
import { provideApp } from 'app/shared/providers/app.provider';
import { provideToastr } from 'ngx-toastr';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideApp(),
    provideAnimations(),
    provideClientHydration(),
    provideIcons(),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    { provide: LOCALE_ID, useValue: 'fr' },
    provideToastr({ positionClass: 'toast-bottom-right', progressBar: true }),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor, LoadingInterceptor])),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    provideStore({
      auth: authReducers
    }),
    provideHttpClient(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['fr', 'en', 'sw'],
        defaultLang: 'fr',
        fallbackLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      },
      loader: TranslocoHttpLoader
    })
  ]
};
