import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
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

registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideApp(),
    provideAnimations(),
    provideClientHydration(),
    provideIcons(),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    { provide: LOCALE_ID, useValue: 'fr' },
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor, LoadingInterceptor])),
    provideRouter(appRoutes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideStore({
      auth: authReducers
    })
  ]
};
