import { HttpErrorResponse, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, TitleStrategy, withPreloading } from '@angular/router';
import { provideFuse } from '@fuse';
import { appRoutes } from 'app/app.routes';
import { provideIcons } from 'app/common/icons/icons.provider';
import { provideClientHydration } from '@angular/platform-browser';
import { PageTitleStrategy } from './common/strategies/page-title.strategy';
import { httpInterceptor } from './common/interceptors/http.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { authReducers } from './common/store/app.reducers';
import { AuthEffects } from './common/store/app.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideQueryClientOptions, QueryCache, QueryClientConfigFn } from '@ngneat/query';

const ngneatConfigFn: QueryClientConfigFn = () => {
  return {
    queryCache: new QueryCache({
      onError: (error: HttpErrorResponse) => error.error.message
    }),
    defaultOptions: {
      queries: {
        staleTime: 3000
      }
    }
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideQueryClientOptions(ngneatConfigFn),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'D'
        },
        display: {
          dateInput: 'DDD',
          monthYearLabel: 'LLL yyyy',
          dateA11yLabel: 'DD',
          monthYearA11yLabel: 'LLLL yyyy'
        }
      }
    },
    provideIcons(),
    provideFuse({
      fuse: {
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
    provideClientHydration(),
    provideEffects([AuthEffects]),
    provideStore({
      auth: authReducers
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
