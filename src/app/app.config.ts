import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, TitleStrategy, withPreloading } from '@angular/router';
import { provideFuse } from '@fuse';
import { appRoutes } from 'app/app.routes';
import { provideIcons } from 'app/core/icons/icons.provider';
import { provideClientHydration } from '@angular/platform-browser';
import { PageTitleStrategy } from './core/strategies/page-title.strategy';
import { authInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
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
        theme: 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default'
          },
          {
            id: 'theme-brand',
            name: 'Brand'
          },
          {
            id: 'theme-teal',
            name: 'Teal'
          },
          {
            id: 'theme-rose',
            name: 'Rose'
          },
          {
            id: 'theme-purple',
            name: 'Purple'
          },
          {
            id: 'theme-amber',
            name: 'Amber'
          }
        ]
      }
    }),
    provideClientHydration()
  ]
};
